Kinect ile sanal giyinme odası uygulaması
2012-01-21
Bilgisayarla görü, Programlama
Giyim mağazalarında çoğu zaman bir ürünü almadan önce denemek isteriz, peki ya denemek mümkün değilse? Bu yazıda geçenlerde geliştirdiğim bir uygulama olan sanal giyinme odasından bahsedeceğim.
http://www.isikdogan.com/img/thumbs/kinect_dressing.jpg
---
>A more detailed report in English: [ <a href="http://www.isikdogan.com/files/isikdogan_kinect.pdf" target="_blank">A Real Time Virtual Dressing Room Application using Kinect</a> ]
[vid]http://youtu.be/Vs-dmwhhsqg[/vid]

Giyim mağazalarında çoğu zaman bir ürünü almadan önce denemek isteriz, peki ya denemek mümkün değilse? Seçeneklerin artması ile denemenin daha zahmetli hale gelmesi bir yana online alışveriş gibi durumlarda denemek hiç mümkün olmayabilir. Bu yazıda geçenlerde geliştirdiğim bir uygulama olan sanal giyinme odasından bahsedeceğim. Uygulamada kullanıcı sanal bir ortamda giysi seçebilmekte ve seçtiği giysileri üzerinde deneyebilmektedir.
Uygulamayı geliştirirken bir görüntü ve derinlik sensörü olan Microsoft Kinect'i ve Microsoft Research tarafından geliştirilen yazılım geliştirme kitini (Kinect SDK) kullandım, uygulamanın çalışma mantığını genel olarak aşağıdaki gibi özetleyebilirim:
* Derinlik ve kullanıcı etiketi verisinden faydalanılarak kullanıcının canlı video akışından çıkarılması (arkaplan silme),
* İstenmeyen örtüşmelerin engellenmesi için ten rengi algılama,
* Giysi modelinin konum ve rotasyonunun eklem noktalarının koordinatlarına göre hizalanması,
* Giysinin eklemler arası uzaklık ve kameradan uzaklık verisinin kullanılarak ölçeklenmesi,
* Modelin kullanıcının üzerinde gösterilmesi.

##Ön işlemler: arkaplan silme ve ten rengi algılama

Arkaplan silme bu uygulamada iki açıdan kolaylık sağlamaktadır. Birincisi kullanıcıyı çıkartarak ileriki işlemler için ilgili olan alanı (ROI) belirlememizi sağlamaktadır. Bu sayede ten rengi algılama aşamasında arkaplandaki ten rengine benzer alanların da ten rengi olarak algılanması problemi çözülmüş olmaktadır. İkincisi ise arkaplanı sildiğimizde herhangi istediğimiz bir arkaplanla değiştirerek sanal bir ortam oluşturabiliriz. KinectSDK'nın sağlamış olduğu derinlik ve kullanıcı etiketi verisini kullanarak basit bir maskeleme ile bu işlemi kolayca gerçekleştirebiliriz.
Giysi modeli görüntünün üstüne eklendiğinden kullanıcının hareketi modelin arkasında kısıtlı kalmaktadır. Bu bağlamda ten rengi algılamada istenmeyen örtüşmelerin engellenmesi amaçlanmıştır.  Uygulamada ten rengine sahip alanlar en üst katmana taşınarak model ile örtüşmeleri engellenmektedir. Bu konuda yapılabilecek daha akıllıca bir çözüm derinlik verisinden faydalanarak giysi modeli ile kullanıcının derinlik sıralamasını ayarlamak olabilir. Burada böyle bir yaklaşımı benimsememin tek nedeni daha kolay olmasıydı. Kameradan gelen RGB görüntü YCbCr renk uzayına dönüştürülüp her renk kanalı için basit bir eşikleme uygulanması ten rengi algılamada en basit çözüm olarak kolayca gerçeklenebilir.
##Hizalama ve ölçekleme
Kinect SDK ile sağlanan iskeletsel takipçi (skeletal tracker) vücut eklemlerinin 3 boyutlu koordinatlarını yaklaşık olarak vermektedir. Eklemlerin ekrandaki piksel konumları ve birbirleri ile yaptıkları açılardan faydalanılarak giysi modelinin konumlandırılması ve döndürülmesi sağlanmıştır. Omuzlar arası uzaklık, boy uzunluğu ve kullanıcının kameradan uzaklığı değerlendirilerek giysi modeli ölçeklenmiştir. 
##Daha neler yapılabilir?
Başarım kriterini kullanıcının giysi modeli ile örtüşme oranı olarak belirleyerek uygulamayı farklı koşullar altında test ettiğimizde %83 ortalama başarı oranı elde ettik. İlerleyen aşamalarda 3 boyutlu giysi modelleri ve fizik motoru kullanılarak daha gerçekçi sonuçlar elde edilebilir. Alternatif olarak giysilerin farklı açılardan çekilmiş fotoğrafları kullanılarak sahte 3d izlenimi oluşturulabilir. Örtüşmelerin işlenmesinde daha önce de bahsettiğim gibi renk özellikleri yerine derinlik verisinden faydalanılabilir.
Gelen geribildirimler üzerine şunu da belirtmek istiyorum evet daha önce yapılmış benzer uygulamalar var, zaten bu fikri ilk benim bulduğum gibi bir iddiada bulunmuyorum. Benimkisi ticari olmayan yalnızca deneysel amaçlı bir çalışma.

