Kamera tabanlı çoklu öğe takip sistemi
2011-07-28
Görüntü işleme, Bilgisayarla görü, Programlama, Staj
Bu proje ile kamera görüş alanı içerisinde hareket eden öğelerin tespit edilmesi ve her ögenin kendi tanımlayıcı numarası ile takip edilmesi sağlanıyor.
http://www.isikdogan.com/img/thumbs/multi_agent.jpg
---
PSNC'deki 3. haftamın sonunda tamamladığım bu proje ile kamera görüş alanı içerisinde hareket eden öğelerin tespit edilmesi ve her ögenin kendi tanımlayıcı numarası ile takip edilmesi sağlanıyor. Bir önceki projemde olduğu gibi bu uygulamayı da Java ile OpenCV kütüphanesi arasında bir köprü niteliğinde olan JavaCV sarmalayıcısını kullanarak geliştirdim. Projenin temel işleyiş biçimini aşağıdaki başlıklar altında özetleyebiliriz.

[vid]http://youtu.be/Vg8vvdmS7QE[/vid]
##Mevcut anlık görüntü içerisinde nesne bulma (Blob Detection)
Anlık görüntü içerisinde hareket eden cisimlerin bulunması için uygulanan yöntemler;
* [Mixture of Gaussians](http://www.google.com/search?q=mixture+of+gaussians+background+subtraction){: target="_blank"} yaklaşımı ile dinamik arkaplan çıkarımı,
* Elde edilen görüntünün [eşikleme](http://en.wikipedia.org/wiki/Thresholding_(image_processing)){: target="_blank"} uygulanarak binary görüntüye dönüştürülmesi,
* [Biçimsel işlemler](http://en.wikipedia.org/wiki/Morphological_operations){: target="_blank"} ile gürültünün giderilmesi ve nesne içi kopuklukların kapatılması,
* [Bağlı bileşenlerin](http://en.wikipedia.org/wiki/Connected-component_labeling){: target="_blank"} bulunması ve çevreleyen dikdörtgenlerin elde edilmesi şeklinde özetlenebilir.
##Bulunan nesnelerin bir önceki anlık görüntü ile ilişkilendirilmesi
Videonun ardışık çerçevelerinde aynı nesnelerin birbirleriyle ilişkilendirilmesini sağlamak için temel olarak aşağıdaki adımlar uygulanmıştır;* Bir önceki görüntüdeki nesnelerin mevcut nesnelere koordinat uzaklıklarının bulunması,* Görüntünün RGB renk uzayından [HSV](http://en.wikipedia.org/wiki/HSL_and_HSV){: target="_blank"} uzayına dönüştürülmesi ve nesnelerin Hue-Saturation histogramlarının elde edilmesi,* Histogramların normalizasyonu ve birbirine olan uzaklıklarının bulunması,* Ardışık iki görüntüdeki nesnelerin koordinat ve histogram uzaklıklarının karşılaştırılması,* Mesafe ve renk olarak en yakın olan nesnelerin uzaklığı belirli bir değerin altındaysa nesne tanımlayıcılarının (ID) eşleştirilmesi, değilse nesneye yeni ID atanması.
##Çerçeveler arası süreksizlik probleminin çözümü
Anlık çerçevede bir nesne kaybolduğunda nesnenin önceki çerçevelerdeki hareketi göz önünde bulundurularak lineer regresyon ile yeni konumu hesaplanmaktadır. Nesnenin gerçekten kaybolmuş olabileceği durumunu da ele alabilmek için hesaplanarak konumu tahmin edilen nesneler hayalet nesne olarak işaretlenmekte ve ardisik çerçeve sayısı cinsinden bir ömür atanmaktadır. İlerileyen çerçevelerde nesne tekrar tespit edilirse yakalanmakta ve gerçek nesne olarak işaretlenmekte, ömrü bitene kadar tespit edilemezse silinmektedir. Bir nesnenin kisa bir sure icin kaybolmasi sorun oldugu gibi, genellikle görüntüdeki küçük hareketliliklerden kaynaklanan (örneğin ağaçların rüzgarla hareket etmesi) kisa sureli istenmeyen nesnelerin ortaya çıkması da problem olmaktadir. Bu sorun da benzer şekilde her nesneye bir yaşam süresi atanması ve belirli bir süreden daha uzun süre varlığını sürdürmeyen nesnelerin silinmesi ile çözülmüştür.

