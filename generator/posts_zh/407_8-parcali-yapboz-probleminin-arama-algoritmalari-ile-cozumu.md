8-Puzzle probleminin arama algoritmaları ile çözümü
2011-01-02
Yapay Zeka, Programlama, En çok okunan yazılar
8-Puzzle problemi 1’den 8’e kadar sayılarla doldurulmuş ve bir karesi boş olan 3x3 boyutunda bir matrisin istenilen bir hedef duruma getirilmesinin amaçlandığı bir oyun olarak tanımlanabilir.
http://www.isikdogan.com/img/blog/8puzzle.jpg
---
![Uygulamanın Ekran Görüntüsü](../img/blog/8puzzle.jpg){: .pull-right}

><a class="btn btn-primary" href="http://www.isikdogan.com/files/software/EightPuzzleSolver.zip"><span class="fa fa-windows fa-lg"></span>&nbsp;&nbsp;&nbsp; 8-Puzzle Çözücü v1.1 İndir</a> <a class="btn btn-primary" href="https://gist.github.com/isikdogan/9fec19bc2d208399c0af"><span class="fa fa-github fa-lg"></span>&nbsp;&nbsp;&nbsp; Kaynak Kodlar</a>

8-Puzzle problemi 1’den 8’e kadar sayılarla doldurulmuş ve bir karesi boş olan 3x3 boyutunda bir matrisin istenilen bir hedef duruma getirilmesinin amaçlandığı bir oyun olarak tanımlanabilir. Puzzle üzerindeki elemanların yalnızca boşluk ile yer değiştirdiği (kaydırıldığı) hareketler geçerli kabul edilmektedir.

Çözüm uzayında herhangi bir durumdan en fazla 4 duruma geçilebilmektedir. Çözüm uzayının ağaç yapısıyla ifade edilmesi mümkündür, ancak bu uygulamada sezgisel arama sırasında en küçük durumun bulunmasını kolaylaştırdığı için kuyruk yapısının kullanılması tercih edilmiştir. Bu çalışmada sezgisel arama yöntemi olarak A* algoritması ve sezgisel olmayan arama yöntemleri olarak önce enine arama ve önce derinliğine arama algoritmaları gerçeklenmiştir.

Geliştirilen uygulamayı aşağıdaki linkten indirebilir, çözüm detaylarını yazının devamında okuyabilirsiniz.

##Çözülebilirlik Kontrolü

Problemi çözebilmek için öncelikle problemin çözümünün olup olmadığının kontrolü yerinde olacaktır. 3x3 Boyutunda bir puzzle’ın çözülebilmesi için ters sıralı eleman sayısının çift olması gerekmektedir. Başlangıç durumunda her eleman için kendisinden önce gelmesi gerektiği halde kendisinden sonra gelmiş olan eleman sayısını topladığımızda ters sıralı eleman sayısını bulabiliriz.

Bu durumu bir örnek ile açıklayacak olursak:

	Hedef Durum:		1 2 3 8 0 4 7 6 5
	Başlangıç Durumu:	1 2 3 8 0 4 7 5 6

1,2,3,8,0,4 ve 7 numaralı elemanlar için kendisinden önce gelmesi gerektiği halde sonra gelen eleman bulunmadığından ters sıralı eleman sayısı sıfırdır. Ancak 5 numaralı elemandan önce gelmesi gereken 6 numaralı eleman kendisinden sonra geldiği için ters sıralı eleman sayısı 1 olur. Toplam ters sıralı eleman sayısı tek olduğundan başlangıç durumundan hedef durumuna giden bir çözüm bu örnek için bulunmamaktadır.

##Alt durumların Oluşturulması

Boş elemanın bulunduğu konuma göre bir durumdan 2,3 veya 4 farklı duruma geçilebilmektedir. Bu durumlar boş eleman ile komşu elemanlarından birinin yer değiştirmesi yoluyla elde edilmektedir. Daha önceden gelinmiş olan durumlara tekrar gelinmesi engellenerek çözüm uzayındaki dallanma küçültülebilmektedir.

<img  title="defend_your_thesis" src="../img/blog/puzzle_sample.gif" />

##Problemin Sezgisel Olmayan Arama Yöntemleri ile Çözümü

Çözüm uzayını bir ağaç gibi düşündüğümüzde, ağacı enine veya derinlemesine tarayarak hedef duruma ulaşabiliriz. Önce enlemesine aramada önce kök düğüm kuyruğa eklenir, kuyruk boş olana kadar veya hedef duruma ulaşılana kadar kuyruğun başından bir düğüm çekilir ve düğümün alt düğümleri kuyruğun sonuna eklenir. Bu sayede kuyruk yapısı kullanılarak çözüm uzayında enlemesine bir tarama yapılmış olur. Benzer şekilde önce derinlemesine aramada da yığın yapısı kullanılabilir. Alt düğümler yığının başına eklendiğinde derinlemesine bir tarama sağlanmış olur.

##Problemin A* Sezgisel Arama Yöntemi ile Çözümü

Hedef düğüme daha hızlı ulaşılabilmesi için sezgisel bir arama kullanmak yerinde olacaktır. Sezgisel bir arama yöntemi olan A\* algoritmasını sezgisel uzaklık hesaplayan bir fonksiyon kullanarak gerçekleyebiliriz. Bir düğümün başlangıca olan uzaklığına ‘g’, hedefe olan tahmini uzaklığına ‘h’ diyecek olursak toplam uzaklık ‘ f = g+h ’ olacaktır. A* algoritmasının kuyruk yapısı ile basitçe aşağıdaki gibi gerçekleyebiliriz:

* Öncelikle kök düğüm kuyruğa atılır.
* Toplam uzaklığı en az olan düğüm bulunur kuyruktan çıkartılır ve döngü oluşturmayan alt düğümleri kuyruğa eklenir.
* Hedef duruma ulaşılana kadar toplam uzaklığı en az olan düğümün seçilmesi ve alt düğümlerinin oluşturulmasına devam edilir.

Hedef duruma olan sezgisel uzaklığı mevcut durumdaki her elemanın hedef durumda olması gereken yere şehir blok uzaklıklarının (Manhattan distance)  toplamı şeklinde ifade edilebilir. Örneğin aşağıdaki durumun sezgisel uzaklığını hesaplayacak olursak:

	Hedef Durum:  	1 2 3 
					8 x 4
					7 6 5
					
	Eleman:       	1 2 3 
					8 4 5
					7 6 x
					
	Uzaklık:      	0 0 0
					0 1 1 
					0 0 2
					
	h = 1 + 1 + 2 = 4

Kesin olmamakla birlikte sonuç duruma uzaklığı az olan durumlar genellikle daha az sayıda hamle ile ulaşılabilecek adımlar olmaktadır. Çözüm uzayında toplam uzaklığı az olan durumlar üzerinden ilerlemek sezgisel olmayan arama yöntemlerine göre çözüme daha hızlı ulaşmayı kolaylaştırmaktadır.

##Test Sonuçları

Sezgisel ve sezgisel olmayan arama yöntemlerini karşılaştırdığımızda, basit problemlerde başarımda fazla fark görülmezken, hedef duruma olan uzaklık arttıkça başarım farkının da arttığı gözlemlenmektedir. Önce enine aramada aynı seviyedeki bütün durumlar tarandığından bulunan ilk çözüm en az adım sayısı ile ulaşılabilen çözüm olmaktadır. Derinliğine aramada taranan her düğümde adım sayısı bir arttığından taranan düğüm sayısı çözüme ulaşan adım sayısı ile eşit (kök düğümü sayarsak bir fazlası) olmaktadır. Bu yüzden bu problemde önce derinliğine arama kullanmak çoğunlukla başarılı sonuçlar vermemektedir. Taranan düğüm sayısı başarımın bir ölçütü olarak kabul edildiğinde yukarıdaki örneklerde problemin karmaşıklığı arttıkça A* ile diğer yöntemler arasındaki başarım farkının da arttığı gözlemlenmektedir.

##Sonuç

8-Puzzle probleminin çözülebilir olduğu durumlarda sezgisel arama yöntemleri ile sonuca daha hızlı ulaşılabilmektedir. Problemin çözümsüz olduğu durumlara ve çözülebilirlik koşuluna önceki bölümlerde değinilmiştir. Sezgisel uzaklık hesaplamada şehir blok uzaklıkları toplamının kullanılmasının bilgisiz arama yöntemlerine göre avantaj sağladığı ve başarımda önemli ölçüde artış sağladığı test sonuçlarında da görülmüştür.

Problemin gerçek zeka ile çözümünü ele aldığımızda da sezgisel bir aramanın söz konusu olduğunu görebiliriz, çözüme daha yakın olduğu tahmin edilen duruma geçen hamle genellikle tercih edilen bir sonraki hamle olmaktadır. Bu bağlamda yapay zekâ ile sezgisel arama yöntemleri, gerçek zekâ ile aramanın basit anlamda modellenmesi olarak düşünülebilir.

