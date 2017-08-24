Kamera tabanlı araç park alanı izleme sistemi
2011-07-14
Görüntü işleme, Bilgisayarla görü, Programlama, Staj
Otopark alanına bakan bir kameradan alınan görüntüler işlenerek park alanında kaç araç bulunduğu, hangi alanların boş hangilerinin dolu olduğu gibi bilgiler kamera görüntüsü üzerinde görüntüleniyor.
http://www.isikdogan.com/img/thumbs/parkinglot.jpg
---
Stajımın ilk haftasında Java ve (JavaCV sarmalayıcısı ile) OpenCv kullanarak geliştirdiğim bir çeşit görü tabanlı izleme sistemi olan bu proje ile otopark alanına bakan bir kameradan alınan görüntüler işlenerek park alanında kaç araç bulunduğu, hangi alanların boş hangilerinin dolu olduğu gibi bilgiler kamera görüntüsü üzerinde görüntülenebiliyor.

[vid]http://youtu.be/Wk7PINJyt0k[/vid]
Sistemin işleyişi oldukça basit, genel adımları aşağıdaki gibi özetleyebilirim: ![Flowchart](../img/blog/parking_flowchart.jpg)* Kameradan alınan renkli [RGB](http://en.wikipedia.org/wiki/Rgb){: target="_blank"} görüntülerin gri tonlamalı görüntülere dönüştürülmesi,* Arkaplan ve kamera görüntülerinin [histogram eşitleme](http://en.wikipedia.org/wiki/Histogram_equalization){: target="_blank"} yöntemi ile karşıtlıklarının iyileştirilmesi,
* Anlık görüntüden arkaplan çıkarımı,
* [Otsu eşikleme](http://en.wikipedia.org/wiki/Otsu%27s_method){: target="_blank"} yöntemi kullanılarak görüntünün binary hale getirilmesi,
* Biçimsel Kapatma ([Morphological Closing](http://en.wikipedia.org/wiki/Closing_(morphology)){: target="_blank"}) uygulanarak araç bloklarındaki boşlukların doldurulması,
* [Perspektif dönüşümü](http://en.wikipedia.org/wiki/Perspective_transform){: target="_blank"} uygulanarak park alanı görüntüsünün dikdörtgen haline getirilmesi,
* Park alanlarının dönüşüm uygulanmış görüntüden çıkarımı
* Her alan için [integral görüntülerin](http://en.wikipedia.org/wiki/Integral_image){: target="_blank"} (piksel toplamlarının) elde edilmesi
* Toplam değeri belirli bir seviyenin üstünde olan alanların dolu, altında olanların boş olarak işaretlenmesi,
* Araç sayısının ve park alanlarının görüntü üzerine çizdirilmesi.

