/* 
An implementation of Hough Transform for circle detection.
Implemented by Furkan ISIKDOGAN
furkan@isikdogan.com
www.isikdogan.com
14.11.2010
*/

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>
#include <math.h>
#define pi 3.14159265

struct Image{
	int width;
	int height;
	int level;
	unsigned char** data;
};

struct Filter{
	int N;
	double** data;
};

typedef struct Image IMAGE;
typedef struct Filter FILTER;

unsigned char **allocateMatrix(int width, int height)
{
	unsigned char **matrix;

	matrix = (unsigned char **)malloc(sizeof(unsigned char *) * height);

	for (int i = 0; i < height; i++)
		matrix[i] = (unsigned char *)malloc(sizeof(char) * width);

	return matrix;
}

void deallocateMatrix(unsigned char **matrix, int height)
{
	for (int i = 0; i < height; ++i)
		free(matrix[i]);
	free(matrix);
}

IMAGE initializeImage(int width, int height, int level){
	IMAGE img;
    img.width = width;
	img.height = height;
	img.level = level;
    img.data = allocateMatrix(width,height);
	return img;
}

void SkipComments(FILE *fp)
{
	int ch;
	char line[100];

	while ((ch = fgetc(fp)) != EOF && isspace(ch))
		;
	if (ch == '#') {
		fgets(line, sizeof(line), fp);
		SkipComments(fp);
	} else
		fseek(fp, -1, SEEK_CUR);
}

IMAGE readPGM(const char *file_name)
{
	IMAGE img;
	FILE *pgmFile;
	char version[3];

	pgmFile = fopen(file_name, "rb");
    SkipComments(pgmFile);
	fgets(version, sizeof(version), pgmFile);
    SkipComments(pgmFile);
	fscanf(pgmFile, "%d", &img.width);
	fscanf(pgmFile, "%d", &img.height);
	SkipComments(pgmFile);
	fscanf(pgmFile, "%d", &img.level);
	SkipComments(pgmFile);
	fgetc(pgmFile);

	img.data = allocateMatrix(img.width,img.height);

	for (int i = 0; i < img.height; i++)
		for (int j = 0; j < img.width; j++)
			img.data[i][j] = fgetc(pgmFile);

	fclose(pgmFile);
	return img;
}

void writePGM(const char *filename, const IMAGE img)
{
	FILE *pgmFile;

	pgmFile = fopen(filename, "wb");

	fprintf(pgmFile, "P5 ");
	fprintf(pgmFile, "%d %d ", img.width, img.height);
	fprintf(pgmFile, "%d ", img.level);

	for (int i = 0; i < img.height; ++i)
		for (int j = 0; j < img.width; ++j)
				fputc(img.data[i][j], pgmFile);


	fclose(pgmFile);
	deallocateMatrix(img.data, img.height);
}


IMAGE convolve(IMAGE source, FILTER f){
	
	IMAGE result = initializeImage(source.width, source.height, source.level);

	int offset = (f.N)/2;
	double pixel;

	for(int i=offset; i<source.height-offset; i++) //Seek all pixels in the image
		for(int j=offset; j<source.width-offset; j++){
			pixel = 0;

			for(int fH = 0; fH < f.N; fH++) //Apply the filter to the frame
				for(int fW = 0; fW < f.N; fW++)
					pixel += (source.data[i+fH-offset][j+fW-offset] * f.data[fH][fW])/(f.N*f.N);

			result.data[i][j] = (unsigned char)pixel;
		}

	return result;
}

void normalizeImage(IMAGE img){
	int min=img.level;
	int max=0;
	//find minimum and maximum values
	for(int i=0;i<img.height; i++)
		for(int j=0;j<img.width; j++){
			if(img.data[i][j]>max)
				max = img.data[i][j];
			if(img.data[i][j]<min)
				min = img.data[i][j];
		}
	//normalize values
	for(int i=0;i<img.height; i++)
		for(int j=0;j<img.width; j++)
			img.data[i][j] = (img.data[i][j]-min)*img.level/(max-min);
}

int* histogram(IMAGE img){
	int* hist = (int *)malloc(sizeof(int)*(img.level+1));

	for(int k=0; k<=img.level; k++)
		hist[k] = 0; //initialize the histogram array

	for(int i=0; i<img.height; i++)
		for(int j=0; j<img.width; j++)
			hist[img.data[i][j]]++;

	return hist;
}

IMAGE adaptiveThreshold(IMAGE source){

    IMAGE result = initializeImage(source.width, source.height, source.level);
	
	int T = source.level/2; //set the initial value of the threshold
	int* hist = histogram(source);
	int difference;

	do{ //determine the thresholding value
		double M1 = 0;
		double M2 = 0;
		int M1NumOfPixels = 0;
		int M2NumOfPixels = 0;

		for(int i=0; i<T; i++)
			M1NumOfPixels+= hist[i];
		for(int i=0; i<T; i++)
			M1+= (double)i*hist[i];
		M1 = M1/M1NumOfPixels;

		for(int i=T; i<=source.level; i++)
			M2NumOfPixels+= hist[i];
		for(int i=T; i<=source.level; i++)
			M2+= (double)i*hist[i];
		M2 = M2/M2NumOfPixels;

		difference = T - (int)(M1+M2)/2;
		T = (int)(M1+M2)/2;

	}while(difference>1);
	
	//threshold the image
	for(int i=0; i<source.height; i++)
		for(int j=0; j<source.width; j++)
			if(source.data[i][j]>T)
				result.data[i][j] = 255;
			else
				result.data[i][j] = 0;

	return result;
}

void drawCircles(IMAGE img, int*** Accumulator, int rmin, int rmax, int step, int maxRadius, int accThreshold){
	int x,y;
	double t;
	for(int i=0; i < img.height; i++){
		if(i%16 == 0){
		system("cls");
		printf("Progress: %d %% \n",50+(i*50/img.height));}

		for(int j=0; j < img.width; j++){
			for(int k=rmin; (k<rmax && k < maxRadius); k+=step){
				if(Accumulator[i][j][k]>accThreshold)
				for(int theta=0; theta<360; theta++){
					t = ((double)theta * pi) / 180;
					x = (int)ceil(i + k * cos(t));
					y = (int)ceil(j + k * sin(t));
					if(x < img.height && x > 0 && y < img.width && y > 0){
						img.data[x][y]= 255;}
				}
			}
		}
	}
}

void houghTransform(IMAGE source, FILTER edgeFilter, int rmin, int rmax, int step, int accThreshold){
	IMAGE edges = convolve(adaptiveThreshold(source),edgeFilter);
	normalizeImage(edges);
	edges = adaptiveThreshold(edges);
	
	int maxRadius = ceil(sqrt((double)edges.height*edges.height + (double)edges.width*edges.width));

	//Allocate accumulator matrix
	int ***Accumulator = (int***)malloc(sizeof(int)*edges.height);

	for(int i = 0; i < edges.height; i++)
    {
		Accumulator[i] = (int**)malloc(sizeof(int)*edges.width);

		for(int j = 0; j < edges.width; j++)
        {
            Accumulator[i][j] = (int*)malloc(sizeof(int)*maxRadius);
        }
    }
	//Reset the accumulator
	for(int i=0; i < edges.height; i++)
		for(int j=0; j < edges.width; j++)
			for(int k=0; k < maxRadius; k++)
				Accumulator[i][j][k] = 0;

	//Let all edges vote possible circles
	int x0, y0;
	double t;
	for(int x=0;x<edges.height;x++) {	//x height(row), y width(col)
		if(x%16 == 0){
		system("cls");
		printf("Progress: %d %% \n",(x*50/edges.height));}

		for(int y=0;y<edges.width;y++) {

			if ((edges.data[x][y])> 0) { //for each edge point
				for (int r = rmin; ( r < rmax && r< maxRadius ); r+=step){	
				for (int theta=0; theta<360; theta++) {
					t = ((double)theta * pi) / 180;
					x0 = (int)ceil(x - r * cos(t));
					y0 = (int)ceil(y - r * sin(t));
					if(x0 < edges.height && x0 > 0 && y0 < edges.width && y0 > 0) {
						Accumulator[x0][y0][r] ++; }
				}//end for theta
			}//end for r
			}//end if
			}//end for y
	}//end for x

	//illustrate the circles on the image
	drawCircles(source,Accumulator,rmin,rmax,step,maxRadius,accThreshold);
}

int main()
{
	char filename[40];
	char useDefaults;

	//default parameters
	char prefix[50] = "hough_";
	int rmin = 20;
	int rmax = 50;
	int step = 5;
	int accThreshold = 120;

    FILTER Sobel;
    double SobelMatrix[5][5]= {{-1,0,1},
   							   {-2,0,2},
							   {-1,0,1}};
    Sobel.N = 3;
    Sobel.data = (double **) malloc(sizeof(double*) * Sobel.N);
	for (int i = 0; i < Sobel.N; i++)
		Sobel.data[i] = (double *) malloc(sizeof(double) * Sobel.N);

	for(int i=0; i<Sobel.N; i++)
		for(int j=0; j<Sobel.N; j++)
			Sobel.data[i][j] = SobelMatrix[i][j];

	printf("An implementation of Hough Transform for circle detection\n\n");
	printf("Furkan ISIKDOGAN | furkan@isikdogan.com\n");

	printf("\nEnter filename: "); gets(filename);
	IMAGE img = readPGM(filename);

	printf("\nUse default parameters? [y/n]: ");
	scanf("%c",&useDefaults);

	if(useDefaults == 'n'){
	printf("\nEnter minimum and maximum radius length of circles to be detected\nin terms of the number of pixels (defaults 20 and 50): ");
	scanf("%d%d",&rmin,&rmax);
	printf("\nEnter the increment of the radius in terms of the number of pixels\n(higher values: faster, lower values: more precise, default 5): ");
	scanf("%d",&step);
	printf("\nEnter the threshold value for the accumulator in terms of the number of votes\n(default 120): ");
	scanf("%d",&accThreshold);
	}

	houghTransform(img,Sobel,rmin,rmax,step,accThreshold);
	
	writePGM(strcat(prefix,filename),img);
	printf("\nOutput file created: \"%s\"\n",prefix);
    system("pause");
	return 0;
}
