Kamera kontrollü bayrak yakalama oyunu
2011-08-11
Görüntü işleme, Bilgisayarla görü, Programlama, Staj
Polonya'daki stajımın son haftasında bilim günü isimli etkinlikte küçük çocuklar için sergilenmek üzere kamera kontrollü küçük bir oyun geliştirdim.
http://www.isikdogan.com/img/blog/color_thresholding.jpg
---
Polonya'daki stajımın son haftasında bilim günü isimli etkinlikte küçük çocuklar için sergilenmek üzere kamera kontrollü küçük bir oyun geliştirdim. Oyunu kullanıcı etkileşimi ve oyun mantığı olmak üzere iki bölümde inceleyebiliriz.

##Kullanıcı Etkileşimi

Oyun kontrolünün farklı renklerde başlıklar giyen oyuncuların kuş bakışı bir kameradan alınan görüntüleri aracılığıyla sağlanması amaçlanmaktadır. Ancak test aşamasında kullanım kolaylığı nedeniyle normal kamera ve kullanıcıları temsilen renkli işaretçiler kullanılmıştır.
![Color Thresholding](../img/blog/color_thresholding.jpg){: .pull-right}

Her kullanıcı için bir renk aralığı tanımlanmakta ve bu aralığa göre eşikleme uygulanmaktadır. Elde edilen görüntünün ağırlık merkezi bulunarak kullanıcının konumu belirlenmektedir. Ağırlık merkezinin x ve y koordinat değerleri görüntü momentleri kullanılarak bulunabilir. Aşağıdaki formülde I(x,y) görüntünün (x,y) koordinatlarına karşılık gelen piksel değerini ifade etmektedir.
<img class="alignleft size-full wp-image-543" title="moments" src="../img/blog/moments.png" alt="" width="175" height="50" />
Position(x) = M<sub>10</sub>/M<sub>00</sub>
Position(y) = M<sub>01</sub>/M<sub>00</sub>
##Oyun Mantığı
Oyunda kullanıcılar, oyun nesneleri ve bunların ilişkileri aşağıdaki oyun kuralları çerçevesinde tasarlanmıştır:

1. Her oyuncu yalnızca kendi rengindeki bayrakları alabilir ve her bayrak için bir puan değeri oyun başlangıcında tanımlanabilmektedir.
2. Bomba ikonu bütün kullanıcılar tarafından alınabilmektedir ve alınması durumunda bütün diğer oyuncular kurulum sırasında tanımlanmış değer kadar puan kaybetmektedirler.
3. Her nesne için belirli bir zaman aşımı bulunmaktadır ve hiçbir oyuncu tarafından yakalanmayan nesneler tanımlanan süre sonunda kaybolmaktadır.
Bu arada telif hakları problem olmasın diye oyun grafiklerini de kendim tasarladım. :)
![Oyunun grafikleri](../img/blog/graphics.png "graphics")

[vid]http://youtu.be/L0aelUH0cUY[/vid]

