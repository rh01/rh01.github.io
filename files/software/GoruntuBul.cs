using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Collections;

namespace GoruntuBul
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        [Serializable]
        public class ImageRecord {
            public string fileName;
            public double[] histogram;
        }

        public string[] getFiles(string SourceFolder, string Filter, System.IO.SearchOption searchOption)
        {
            //Dizindeki belirli uzantıdaki dosyaları bulan metot
            ArrayList alFiles = new ArrayList();

            string[] MultipleFilters = Filter.Split('|');

            foreach (string FileFilter in MultipleFilters)
            {
                alFiles.AddRange(Directory.GetFiles(SourceFolder, FileFilter, searchOption));
            }

            return (string[])alFiles.ToArray(typeof(string));
        }

        public void trainSystem(string fileDirectory, string dbFile) {

            //Eğitim veritabanını oluştur
            Stream fileStream = new FileStream(dbFile, FileMode.Create, FileAccess.Write);
            IFormatter formatter = new BinaryFormatter();

            //Eğitim dizinindeki bütün bitmap dosyalarını listele
            string[] filePaths = getFiles(fileDirectory, "*.gif|*.jpg|*.png|*.bmp", SearchOption.AllDirectories);

            Int32 numOfImages = filePaths.Length;
            formatter.Serialize(fileStream, numOfImages);  //Görüntü sayısını dosyaya yaz

            Bitmap bm;

            //Her dosya için 64bin histogram ve dosya isminden oluşan bir nesne oluştur
            //Oluşturulan nesneyi serileştirerek dosyaya kaydet
            for (int i=0; i<filePaths.Length; i++)
            {
                bm = (Bitmap)Bitmap.FromFile(filePaths[i]);
                ImageRecord newRecord = new ImageRecord();
                newRecord.histogram = generate64binHistogram(bm);
                newRecord.fileName = filePaths[i];

                formatter.Serialize(fileStream,newRecord);

                progressBar1.Value = i*100/filePaths.Length;
            }

            fileStream.Close();
        }

        List<ImageRecord> readTrainingDB(string dbFile) {
            //Dosya isimleri ve dosyalara karşılık gelen histogramları dosyadan okur ve döndürür

            IFormatter formatter = new BinaryFormatter();
            Stream fileStream = new FileStream(dbFile, FileMode.Open, FileAccess.Read);
            
            List<ImageRecord> histogramList = new List<ImageRecord>();

            Int32 numOfImages = (Int32)formatter.Deserialize(fileStream);

            for (int i = 0; i < numOfImages; i++ ) //Dosyaların sonuna kadar histogramları ve dosya isimlerini oku
            {
                ImageRecord newRecord = (ImageRecord)formatter.Deserialize(fileStream);
                histogramList.Add(newRecord);
            }

            fileStream.Close();

            return histogramList;
        }

        public double[] generate64binHistogram(Bitmap bm)
        {

            double[] histogram = new double[64];

            //Histogramı sıfırla
            for (int i = 0; i < histogram.Length; i++)
            {
                histogram[i] = 0;
            }

            for (int i = 0; i < bm.Width; i++)
            {
                for (int j = 0; j < bm.Height; j++)
                {
                    byte red = bm.GetPixel(i, j).R;
                    byte green = bm.GetPixel(i, j).G;
                    byte blue = bm.GetPixel(i, j).B;

                    //Her renk için en yüksek değerli 2 biti al
                    red &= 0xC0;
                    green &= 0xC0;
                    blue &= 0xC0;

                    red >>= 2;
                    green >>= 4;
                    blue >>= 6;

                    byte b64 = (byte)(red | green | blue);

                    //Elde edilen 6 bitlik veriye göre histogram oluştur
                    histogram[b64]++;
                }
            }

            //normalizasyon
            int numOfPixels = bm.Width*bm.Height;

            for (int i = 0; i < histogram.Length; i++)
            {
                histogram[i] /= numOfPixels;
            }

            return histogram;
        
        }

        public ImageRecord[] findresemblances(string testImagePath, List<ImageRecord> histogramList)
        {

            Bitmap testImage = (Bitmap)Bitmap.FromFile(testImagePath);
            
            double[] testHistogram = generate64binHistogram(testImage);

            double[] minimum3dist = new double[3];
            ImageRecord[] minimum3Records = new ImageRecord[3];

            minimum3dist[0] = minimum3dist[1] = minimum3dist[2] = Double.MaxValue;

            foreach (ImageRecord imageRecord in histogramList) //en kısa uzaklıktaki 3 görüntü kaydını bul
            {
                double dist = manhattanDistance(testHistogram, imageRecord.histogram);
                if (dist < minimum3dist[0])
                {
                    minimum3dist[0] = dist;
                    minimum3Records[0] = imageRecord;
                }
                else if (dist < minimum3dist[1])
                {
                    minimum3dist[1] = dist;
                    minimum3Records[1] = imageRecord;
                }
                else if (dist < minimum3dist[2])
                {
                    minimum3dist[2] = dist;
                    minimum3Records[2] = imageRecord;
                }
            }
            return minimum3Records;
        }

        public double manhattanDistance(double[] histogram1, double[] histogram2)
        {

            double distance = 0;

            for (int i = 0; i < histogram1.Length; i++)
            {
                distance += Math.Abs(histogram1[i]-histogram2[i]);
            }

            return distance;
        }

        private void buttonBrowseTrainFolder_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.Description = "Lütfen eğitim için kullanılacak görüntülerin bulunduğu dizini seçiniz.";
            dialog.RootFolder = Environment.SpecialFolder.Desktop;

            if (dialog.ShowDialog() == DialogResult.OK)
            {
                textBoxTrainFolder.Text = dialog.SelectedPath;
            }
        }

        private void buttonBrowseDBPath_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Title = "Veritabanı dosyasını kaydet";
            sfd.Filter = " TrainingDataBase(*.tdb)|*.tdb";
            if (sfd.ShowDialog() == DialogResult.OK && sfd.FileName.Length > 3)
            {
                textBoxDBPath.Text = sfd.FileName;
            }
        }

        private void buttonTrain_Click(object sender, EventArgs e)
        {
            
            if (textBoxDBPath.Text.Length != 0 && textBoxTrainFolder.Text.Length != 0)
            {
                buttonTrain.Enabled = false;
                trainSystem(textBoxTrainFolder.Text, textBoxDBPath.Text);
                buttonTrain.Enabled = true;
                progressBar1.Value = 100;
                labelInfo.Text = "Eğitim işlemi tamamlandı, özellik dosyası oluşturuldu.";
            }
            else
            {
                MessageBox.Show("Lütfen eğitim veri setinin bulunduğu dizini ve oluşturulacak eğitim dosyasının tam adresini seçin.","Hata");
            }
        }

        private void buttonBrowseTestImage_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Title = "Lütfen bir görüntü dosyası seçiniz.";
            ofd.Filter = " Bitmap(*.bmp)|*.bmp|JPEG(*.jpg)|*.jpg|PNG(*.png)|*.png";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                textBoxTestImage.Text = ofd.FileName;
                pictureBoxTest.Image = Bitmap.FromFile(ofd.FileName);
            }
        }

        private void buttonTestSystem_Click(object sender, EventArgs e)
        {
            if (textBoxTestImage.Text.Length != 0 && textBoxOpenTrainDB.Text.Length != 0)
            {
                List<ImageRecord> histogramList = readTrainingDB(textBoxOpenTrainDB.Text);
                ImageRecord[] resembleImages = findresemblances(textBoxTestImage.Text, histogramList);
                pictureBox1.Image = Bitmap.FromFile(resembleImages[0].fileName);
                pictureBox2.Image = Bitmap.FromFile(resembleImages[1].fileName);
                pictureBox3.Image = Bitmap.FromFile(resembleImages[2].fileName);
                textBoxResults.Text = resembleImages[0].fileName +"\r\n"
                                    + resembleImages[1].fileName +"\r\n"
                                    + resembleImages[2].fileName;
            }
            else
            {
                MessageBox.Show("Lütfen sınama görüntüsünü ve eğitim dosyasının tam adresini seçin.", "Hata");
            }
        }

        private void buttonBrowseOpenDB_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Title = "Veritabanı dosyasını aç";
            ofd.Filter = " TrainingDataBase(*.tdb)|*.tdb";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                textBoxOpenTrainDB.Text = ofd.FileName;
            }
        }
    }
}
