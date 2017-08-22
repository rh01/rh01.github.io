Çizgi izleyen robotumuz :)
2011-01-27
Programlama, Robot, En çok okunan yazılar
Bizim de çizgi izleyen bir robotumuz oldu. Robotun teknik detaylarını ve videosunu yazının devamında inceleyebilirsiniz.
http://www.isikdogan.com/img/blog/robot_cizgitt.jpg
---

><a class="btn btn-primary" href="http://www.isikdogan.com/files/software/cizgitt.c"><span class="fa fa-cloud-download fa-lg"></span>&nbsp;&nbsp;&nbsp; Kaynak Kodlar</a>

![Robotumuz](../img/blog/robot_cizgitt.jpg){: .pull-right}

Bizim de çizgi izleyen bir robotumuz oldu. Çok yenilikçi bir çalışma olduğu söylenemez ama uğraşması oldukça zevkli. :)  Gerçek zamanlı sistemler dersinin projesi olarak 3 kişilik bir ekip ile 4 günde geliştirdiğimiz bu robotun teknik detaylarını ve videosunu yazının devamında inceleyebilirsiniz.
Geliştirilen robot, beyaz zemin üzerindeki siyah çizgiyi IR yansımaya dayalı algılayıcıları ile algılamakta ve çizginin oluşturduğu yol üzerinde ilerlemektedir. Yazının devamında robotun kullandığı karar yöntemleri, robotun tasarımı, karşılaşılan problemler ve çözümlerine yer verilmiştir.
Kullanılan Malzemeler:
* [Texas Instruments MSP430](http://focus.ti.com/lit/ds/symlink/msp430g2231.pdf){: target="_blank"} Mikrodenetleyici
* [CNY70](http://www.datasheetcatalog.org/datasheet/vishay/83751.pdf){: target="_blank"} Karşıtlık sensörleri
* [L298](http://www.datasheetcatalog.org/datasheet2/2/052daje928cw7pc0uqs1ipyryppy.pdf){: target="_blank"} Motor sürücü tümdevresi
* [LM324](http://www.datasheetcatalog.org/datasheet/texasinstruments/lm324.pdf){: target="_blank"} İşlemsel kuvvetlendirici tümdevresi
* 1KΩ potansiyometre, 47KΩ ve 330Ω dirençler
* 12V DC Motorlar
* Robot gövdesi, pil yuvası, anahtar v.s.

[vid]http://youtu.be/E1qM8QrMWck[/vid]
##Çizginin Algılanması
Siyah çizginin beyaz zeminden ayırt edilebilmesi için, karşıtlık sensörü olarak da bilinen CNY70 sensörler kullanılmıştır. CNY 70, kızılötesi ışık yayan ve bu ışığı geri alıp alamamasına göre analog çıkış veren ve önünde yansıtıcı bir yüzey olup olmadığına karar vermemize yarayan bir algılayıcıdır. Her bir CNY70 sensörü iki bölümden oluşmaktadır. Bunlardan gönderici uçtan gönderilen kızılötesi ışık yerden (beyaz zeminden) yansıyarak alıcı uç üzerine düştüğünde daha düşük, yerdeki siyah çizgi tarafından soğurulup geri yansımaması veya az yansıması durumunda daha yüksek gerilim çıkış üzerinde oluşmaktadır.
Tasarlanan robotta 3 adet CNY70 kullanılmıştır. Bu sayede dönüşlerde sensörlerden hangilerinin çizgiden çıktığı göz önünde bulundurularak robotun kontrolü gerçekleştirilebilmektedir. Sensörler robotun hareket merkezinin biraz ilerisine, robotun yönüne dik olacak şekilde yerleştirilmiştir.
Problem: Sensörlerden alınan çıkış değerleri tam olarak lojik 1 ve lojik 0 olmadığından mikrodenetleyici tarafından doğrudan algılanamamaktadır.
Gerçeklenen Çözüm: Eşikleme için karşılaştırma amaçlı kullanılmak üzere bir işlemsel kuvvetlendirici (op-amp) entegresi (LM324) ve eşik değerinin ayarlanabilir olmasını sağlayan bir potansiyometre kullanılmıştır. Entegre üzerinde bulunan 4 İşlemsel kuvvetlendiriciden 3’ü, sensör gerilimine eşikleme uygulanıp sonucun 5V veya 0V olarak mikrodenetleyiciye gönderilmesi için yeterli olmuştur.
##Motor Sürüşü
Tasarlanan robotta hareket diferansiyel sürüş ile sağlanmıştır. Birbirinden bağımsız iki ayrı DC motor kullanılmıştır ve motorlar iki ayrı tekeri sürmektedir. Dönüşler motorlar arasındaki hız farkı ile sağlanmıştır. Sola dönüşlerde, dönüşün keskinliğine göre sağ teker hızlı sol teker yavaş çalışmakta veya sol teker durmaktadır.
Problem: Dönüş sırasında robot ilerlemeye devam ettiğinden keskin dönemeçlerde robot çizgiden çıkmakta ve durmaktadır.
Gerçeklenen Çözüm: Keskin dönemeçlerde sağ teker ileri dönerken sol tekerin aynı hızda geri dönmesi sağlanarak robotun olduğu yerde dönebilmesi sağlanmıştır.
Motorlar 12V gerilim ile çalışmaktadır. Devre gerilimi olan 5V motorları sürmek için yeterli olamayacağından 8 adet 1.5V AA pilin ürettiği gerilim L298 motor sürücü entegresinin Vs bacağına bağlanarak motorlar sürülmüştür.  Sürücü entegrenin giriş bacakları olan IN1(5,7) ve IN2(10,12) mikrodenetleyiciye bağlanarak motorların dönüş yönlerinin yazılımsal olarak kontrol edilebilmesi sağlanmıştır.
Motorların hızı [Pulse Width Modulation(PWM)](http://en.wikipedia.org/wiki/Pulse-width_modulation){: target="_blank"} yöntemi ile ayarlanmıştır. L298 entegresinin motor etkinleştirme (enable) uçları mikrodenetleyiciye bağlanarak modülasyon yazılımsal olarak gerçeklenmiştir. M birim süre boyunca E=1 ve N birim süre boyunca E=0 atanarak M ve N değerine bağlı olarak motorların hızlarının kontrolü sağlanmıştır.
##Robot Kontrolü
Robotun kontrolünde Texas Instruments MSP430 mikrodenetleyici kullanılmıştır. Kontrol temel olarak aşağıdaki tablodaki gibi sağlanmıştır:
<table class="table table-condensed">
<tbody>
<tr>
<td valign="top" width="60">Sensör1</td>
<td valign="top" width="60">Sensör2</td>
<td valign="top" width="62">Sensör3</td>
<td valign="top" width="189">Durum</td>
<td valign="top" width="234">Davranış</td>
</tr>
<tr>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="62">Siyah</td>
<td valign="top" width="189">Kalın çizgi üzerinde düz hareket</td>
<td valign="top" width="234">İki motor da ileri yönde eşit hızda hareket eder.</td>
</tr>
<tr>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="62">Beyaz</td>
<td valign="top" width="189">Sola dönüş</td>
<td valign="top" width="234">Sağ motor ileri yönde çalışır sol motor daha yavaş çalışır veya durur.</td>
</tr>
<tr>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="62">Siyah</td>
<td valign="top" width="189">Beyaz çizgi – kullanılmamaktadır</td>
<td valign="top" width="234">-</td>
</tr>
<tr>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="62">Beyaz</td>
<td valign="top" width="189">Sola keskin dönüş</td>
<td valign="top" width="234">Sağ motor ileri yönde sol motor geri yönde çalışır.</td>
</tr>
<tr><td valign="top" width="60">Beyaz</td>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="62">Siyah</td>
<td valign="top" width="189">Sağa dönüş</td>
<td valign="top" width="234">Sol motor ileri yönde çalışır sağ motor daha yavaş çalışır veya durur.</td>
</tr>
<tr>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="60">Siyah</td>
<td valign="top" width="62">Beyaz</td>
<td valign="top" width="189">İnce çizgi üzerinde düz hareket</td>
<td valign="top" width="234">İki motor da ileri yönde eşit hızda hareket eder.</td>
</tr>
<tr>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="62">Siyah</td>
<td valign="top" width="189">Sağa keskin dönüş</td>
<td valign="top" width="234">Sol motor ileri yönde sağ motor geri yönde çalışır.</td>
</tr>
<tr>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="60">Beyaz</td>
<td valign="top" width="62">Beyaz</td>
<td valign="top" width="189">Çizginin dışı</td>
<td valign="top" width="234">Motorları durdurur.</td>
</tr>
</tbody>
</table>

Problem: Robotun dönemeçi dönerken çizgiden çıkması durumunda robot durmaktadır.
Gerçeklenen Çözüm: Robotun çizgiden çıkmadan bir önceki sensör verisi geçici bir değişkende tutulmuştur. Çizgiden çıkıldığında, çizgiden çıkılmadan bir önceki durumun sağa veya sola dönmeyi gerektiren bir durum olması durumunda robot belirtilen yönde keskin dönüş yapmakta ve çizgiyi arayarak tekrar yakalamaya çalışmaktadır. Bu sayede dönemeçlerde çizgiden çıkma durumunun kontrolü yapılmıştır. Çizginin sonuna gelindiğinde çıkılması durumunda bir önceki durum düz gitme durumu olacağından robot yeni çizgi aramamakta ve durmaktadır. Hata sonucu çizginin dönüşle sonlanması durumunda robotun durmaksızın çalışarak çizgi aramasının önüne geçilebilmesi için çizgi arama işlemi belirli bir zaman aşımı tanımlanarak sınırlanmıştır.
##Gövde Tasarımı
Hazırlanan devre ve elektronik elemanlar oyuncak araba kasası üzerine giydirilmiştir. Motorların gerilimi oyuncağın 8 adet AA pil içeren batarya kutusundan alınmıştır. MSP430’un beslemesi için 3 adet AAA pil içeren ayrı pil kutusu kullanılmıştır.

Robotun gövde tasarımının da genel performans üzerinde etkisi büyük olduğundan tasarımda bazı iyileştirmeler yapılmıştır.
Etkin bir hareket sağlanması için motorların boşta dönme oranının en düşük seviyeye düşürülmesi planlanmıştır. Bu bağlamda robot, ağırlık merkezi (yaklaşık olarak) hareketi sağlayan motorlar üzerinde olacak şekilde gövde üzerinde konumlandırılmıştır. Motorlara bağlı olan tekerlerde çapı daha geniş olan lastikler kullanılarak hareket yeteneğinde iyileştirme sağlanmıştır.
##Sınama
Geliştirilen robot, gittikçe artan karmaşıklığa sahip farklı koşullarda sınanmıştır. Sınama sonuçlarında başarılı sonuç alınana kadar yazılımsal iyileştirmeler yapılmıştır. Sınama sonuçları aşağıda gösterilmiştir:
<table class="table table-condensed">
<tbody>
<tr>
<td valign="top" width="409">Durum</td>
<td valign="top" width="170">Sonuç</td>
</tr>
<tr>
<td valign="top" width="409">Düz çizgiyi takip etme</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Basit dönemeçlerden dönme</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Keskin dönemeçlerden dönme</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Çembersel ve 8 şeklindeki pistte sürekli hareket</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Yol ayrımlarında kenar yola sapmadan devam etme</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Çok dönemeçli kısa pistleri tamamlama</td>
<td valign="top" width="170">Başarılı</td>
</tr>
<tr>
<td valign="top" width="409">Dönemeçlerde çizgiden çıkıldığında çizgiyi geri bulma</td>
<td valign="top" width="170">Başarılı</td>
</tr>
</tbody>
</table>

