#define     MOTOR1                  BIT6 //p1.6 sol
#define     MOTOR2                  BIT5 //p1.5
#define     MOTOR1_LOJIK1           BIT0 //p1.0 (5)
#define     MOTOR1_LOJIK0           BIT4 //p1.4 (7)
#define     MOTOR2_LOJIK1           BIT6 //p2.6 XIN (10)
#define     MOTOR2_LOJIK0           BIT7 //p2.7 XOUT (12)
#define     CNY1                    BIT1 //p1.1 soldaki cny
#define     CNY2                    BIT2 //p1.2
#define     CNY3                    BIT3 //p1.3
#define     SENSOR1                 (P1IN &amp; CNY1)&gt;&gt;1
#define     SENSOR2                 (P1IN &amp; CNY2)&gt;&gt;2
#define     SENSOR3                 (P1IN &amp; CNY3)&gt;&gt;3
#define     TEMEL_HIZ               200
#define     ILERI                   0
#define     GERI                    1
unsigned int bufferDelay = 0;
unsigned char bufferSol;
unsigned char bufferSag;
void initializeMotor(void)
{
  P2SEL &amp;= 0x3F; // XIN ve XOUT basit I/O için kullan
  P1DIR |= (MOTOR1 + MOTOR2) + MOTOR1_LOJIK1 + MOTOR1_LOJIK0; //Motorlar output
  P2DIR |= (MOTOR2_LOJIK0 + MOTOR2_LOJIK1); //motor lojik değerler output
  P1OUT &amp;= ~(MOTOR1 + MOTOR2);
}
void initializeCNY(void)
{
  P1DIR &amp;= ~(CNY1+CNY2+CNY3); //Sensörler input
}
void motor1sur(void)
{
  P1OUT |= MOTOR1;
}
void motor1dur(void)
{
  P1OUT &amp;= ~MOTOR1;
}
void motor2sur(void)
{
  P1OUT |= MOTOR2;
}
void motor2dur(void)
{
  P1OUT &amp;= ~MOTOR2;
}
void motor1pwm(unsigned char surPWM, unsigned char durPWM)
{
  motor1sur();
  while(surPWM--); // motor1 n birim çalışır
  motor1dur();
  while(durPWM--); //motor1 n birim dur
}
void motor2pwm(unsigned char surPWM, unsigned char durPWM)
{
  motor2sur();
  while(surPWM--); // motor1 n birim çalışır
  motor2dur();
  while(durPWM--); //motor1 n birim dur
}
void motor1yon(unsigned char yon)
{
  if(yon == ILERI){ //ileri
    P1OUT |= MOTOR1_LOJIK1;
    P1OUT &amp;= ~MOTOR1_LOJIK0;
  }
  else { //geri
    P1OUT |= MOTOR1_LOJIK0;
    P1OUT &amp;= ~MOTOR1_LOJIK1;
  }
}
void motor2yon(unsigned char yon)
{
  if(yon == ILERI){ //ileri
    P2OUT |= MOTOR2_LOJIK1;
    P2OUT &amp;= ~MOTOR2_LOJIK0;
  }
  else{ //geri
    P2OUT |= MOTOR2_LOJIK0;
    P2OUT &amp;= ~MOTOR2_LOJIK1;
  }
}
void main(void)
{
  WDTCTL = WDTPW + WDTHOLD;
  initializeMotor();
  initializeCNY();
  bufferSol = 0;
  bufferSag = 0;
  while (1) 
  {
    //siyah = 0, beyaz = 1//motor1 sol, motor2 sağ, sensor1 sol, sensor3 sağ
    if((SENSOR1 == 1 &amp;&amp; SENSOR2 == 0 &amp;&amp; SENSOR3 == 1) || (SENSOR1 == 0 &amp;&amp; SENSOR2 == 0 &amp;&amp; SENSOR3 == 0)){      
        bufferSol = 0;
        bufferSag = 0;
        motor1yon(ILERI);
        motor2yon(ILERI);
        motor1pwm(TEMEL_HIZ,140); //eşit hızda ileri
        motor2pwm(TEMEL_HIZ,140);
    }
    if(SENSOR1 == 1 &amp;&amp; SENSOR2 == 1 &amp;&amp; SENSOR3 == 1){
      motor1dur(); //çizgi dışında dur
      motor2dur();
      //çizgiden çıktıysa çizgiyi geri yakala
      if(bufferSol &gt; bufferSag &amp;&amp; (--bufferDelay&gt;0)){
        motor2yon(ILERI);
        motor1yon(GERI);
        motor2pwm(TEMEL_HIZ+55,0); //sağ motor çalış, sola hızlı dön
        motor1pwm(TEMEL_HIZ+55,0); //sol motor geri çalış
        }
      else if(bufferSag &gt; bufferSol &amp;&amp; (--bufferDelay&gt;0)){
        motor1yon(ILERI);
        motor2yon(GERI);
        motor1pwm(TEMEL_HIZ+55,0); //sağ motor çalış, sola hızlı dön
        motor2pwm(TEMEL_HIZ+55,0); //sol motor geri çalış
      }
    }
    else{
      bufferDelay = 300; //çizgi üzerindeyse buffer sayacını sıfırla
    }
    if(SENSOR1 == 0 &amp;&amp; SENSOR2 == 1 &amp;&amp; SENSOR3 == 1){
        motor2yon(ILERI);
        motor2pwm(TEMEL_HIZ+55,0); //sağ motor çalış, sola hızlı dön
        motor1yon(GERI);
        motor1pwm(TEMEL_HIZ+55,0); //sol motor geri çalış
        bufferSol++;
    }
    if(SENSOR1 == 0 &amp;&amp; SENSOR2 == 0 &amp;&amp; SENSOR3 == 1){
        motor2yon(ILERI);
        motor2pwm(TEMEL_HIZ+55,0); //sağ motor çalış, sola dön
        motor1yon(GERI);
        motor1pwm(TEMEL_HIZ,40); //sağ motor (geri çalış) veya (dur)
        bufferSol++;
    }
    if(SENSOR1 == 1 &amp;&amp; SENSOR2 == 1 &amp;&amp; SENSOR3 == 0){
        motor1yon(ILERI);
        motor1pwm(TEMEL_HIZ+55,0); //sol motor çalış, sağa hızlı dön
        motor2yon(GERI);
        motor2pwm(TEMEL_HIZ+55,0); //sağ motor geri çalış
        bufferSag++;
    }
    if(SENSOR1 == 1 &amp;&amp; SENSOR2 == 0 &amp;&amp; SENSOR3 == 0){
        motor1yon(ILERI);
        motor1pwm(TEMEL_HIZ+55,0); //sol motor çalış, sağa dön
        motor2yon(GERI);
        motor2pwm(TEMEL_HIZ,40); //sağ motor geri çalış veya dur
        bufferSag++;
    } 
  }
}