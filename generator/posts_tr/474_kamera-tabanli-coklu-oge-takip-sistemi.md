Kamera tabanlı çoklu öğe takip sistemi
2011-07-28
Görüntü işleme, Bilgisayarla görü, Programlama, Staj
Bu proje ile kamera görüş alanı içerisinde hareket eden öğelerin tespit edilmesi ve her ögenin kendi tanımlayıcı numarası ile takip edilmesi sağlanıyor.
http://www.isikdogan.com/img/thumbs/multi_agent.jpg
---
PSNC'deki 3. haftamın sonunda tamamladığım bu proje ile kamera görüş alanı içerisinde hareket eden öğelerin tespit edilmesi ve her ögenin kendi tanımlayıcı numarası ile takip edilmesi sağlanıyor. Bir önceki projemde olduğu gibi bu uygulamayı da Java ile OpenCV kütüphanesi arasında bir köprü niteliğinde olan JavaCV sarmalayıcısını kullanarak geliştirdim. Projenin temel işleyiş biçimini aşağıdaki başlıklar altında özetleyebiliriz.

[vid]http://youtu.be/Vg8vvdmS7QE[/vid]



* Elde edilen görüntünün [eşikleme](http://en.wikipedia.org/wiki/Thresholding_(image_processing)){: target="_blank"} uygulanarak binary görüntüye dönüştürülmesi,
* [Biçimsel işlemler](http://en.wikipedia.org/wiki/Morphological_operations){: target="_blank"} ile gürültünün giderilmesi ve nesne içi kopuklukların kapatılması,
* [Bağlı bileşenlerin](http://en.wikipedia.org/wiki/Connected-component_labeling){: target="_blank"} bulunması ve çevreleyen dikdörtgenlerin elde edilmesi şeklinde özetlenebilir.




