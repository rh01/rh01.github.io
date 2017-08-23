Powerline communication
2010-01-07
Elektrik Hattı, Haberleşme, En çok okunan yazılar
Elektrik Hattı Üzerinden Haberleşme, elektrik dağıtımı amaçlı kullanılan iletkenleri aynı zamanda veri taşıma amaçlı kullanan bir sistemdir...
http://www.isikdogan.com/img/blog/powerpacket.gif
---
Powerline Communication (Elektrik Hattı Üzerinden Haberleşme), elektrik dağıtımı amaçlı kullanılan iletkenleri aynı zamanda veri taşıma amaçlı kullanan bir sistemdir. PLC sistemleri yeni kablolara ihtiyaç duyulmadan ağ kurulabilmesi fikrinden yola çıkar. Bilgisayarların bulunduğu neredeyse her yerde elektrik şebekesinin de mevcut olması ve bilgisayara yakın bir elektrik prizinin kullanılarak ağ bağlantısı kurulabilmesi Powerline Communication (PLC) sistemlerini cazip kılmaktadır.

##Nasıl Çalışır?
PLC sistemleri modüle edilmiş bir taşıyıcı sinyali elektrik hatları üzerinde ileterek çalışır. Bu modülasyonun ve demodülasyonun yapılması elektrik beslemesine bağlanan terminal aygıtları aracılığı ile yapılır. Alternatif elektrik akımı ve radyo dalgaları farklı frekanslarda olduğu için elektrik akımı ve veri birbirine karışmadan iletilebilir. Powerline networking teknolojileri olan Passport ve PowerPacket ağ kurmak için farklı yöntemler kullanır.

####Passport Yöntemi
HomePlug teknolojisinde ilk olarak Intelogis firması tarafından geliştirilen Passport teknolojisi Frequency Shift Keying (FSK) yöntemini kullanmaktaydı. Bu yöntemde veri iletimi için, biri “1” diğeri “0” anlamında iki ayrı frekans kullanılıyor. Kullanılan frekanslar hat parazitlerinin oluştuğu frekans aralığının hemen üstünde dar bir bant aralığı içerisinde bulunuyordu.
![FSK yöntemi](../img/blog/fsk.gif)
Bu yöntemin en büyük dezavantajı elektriksel dalgalanmadan etkilenmesi, aynı anda birden fazla elektrikli cihaz kullanıldığında performansın düşmesiydi. Çok sayıda frekans kanalı yerine sadece iki ayrı frekans kullanıldığı için frekanslardan biri dış etkiye maruz kaldığında veri akışı kesilebiliyor, bunun üzerine alıcı tarafından alınamayan verinin tekrar talep edilmesi ve bu verinin verici tarafından tekrar yollanması ağda performans düşüklüğüne sebep oluyordu. Intelogis firması bu soruna çözüm olarak bilgisayar ile elektrik prizi arasına takılarak gürültüyü azaltmayı amaçlayan hat iyileştirici güç şeritlerini üretti.
Passport yöntemindeki başka bir sorun ise veri güvenliğinin zayıf olmasıydı. İletim sırasında herhangi bir şifrelemenin yapılmaması güvenli bir ağ için bütün verinin şifrelenerek gönderilmesini gerektirmekteydi.
Diğer bazı dezavantajlar; sistemin sadece Windows temelli bilgisayarlarda çalışması, sadece 110 voltluk elektrik hatlarında çalışacak şekilde tasarlanmış olması, eskimiş kabloların performansı yüksek oranda etkilemesi, yazıcılarda iki yönlü veri akışının sınırlı olması, bağlantı hızının 50-350 Kb/s gibi göreceli olarak düşük olan bir aralıkta bulunması şeklinde sıralanabilir. Bütün bu dezavantajlar Passport yönteminin yaygınlaşmasını engelleyen birer faktör olmuştur.
####PowerPacket Yöntemi
Intellon firması tarafından geliştirilen PowerPacket teknolojisi Passport yöntemindeki dezavantajların çoğuna çözüm getirmiştir. Bu teknik ile 4,3– 20,9 MHz frekans aralığı bir çeşit frekans bölüşümlü çoğullama yöntemi olan Orthogonal Frequency Division Multiplexing (OFDM) modülasyonu ile 84 ayrı kanala ayrılır ve veri paketleri birkaç taşıyıcı frekans boyunca her bir kanal üzerinde eşzamanlı olarak aktarılır. PowerPacket teknolojisi ile veri aktarım hızı 14Mbps’e ulaşabilmektedir.

Elektrik hattı üzerinde aynı anda birden fazla elektrikli cihaz kullanılması, kablo yakınlarında yüksek güç çeken bir cihazın çalışması gibi sebeplerden dolayı hatta elektromanyetik gürültü oluşabilir. Ancak bu durum veri aktarımı için yalnızca iki ayrı frekans kullanan Passport yönteminin aksine PowerPacket yönteminde bütün veri aktarımının aksamasına sebep olmaz. Her frekans parazitlere ve ardışık veri kaybına karşı özel bir PowerPacket entegre devresi tarafından izlenir. Eğer güç kullanımındaki bir gerilim darbesi veya gürültü frekanslardan birini bozarsa kanalın SNR’ı (Sinyal Gürültü Oranı) düşer, iletim hızı yavaşlar ama durmaz. PowerPacket entegre devresi bu bozulmayı fark eder ve bu frekansta taşınan veri sorun çıkaran frekans yerine otomatik olarak başka bir taşıyıcı frekansa atlattırılarak herhangi bir veri kaybı olmadan veri akışının sürekliliği sağlanır, böylece sorun büyük ölçüde çözülmüş olur.
PowerPacket teknolojisinin getirdiği diğer bazı avantajlar; Windows olmayan platformlar ile uyumsuzluk probleminin çözülmüş olması, eski kablolardan etkilenmenin büyük oranda azaltılmış olması, hat voltajından ve frekansından bağımsız çalışması, şifreleme ile güvenlik sorununun çözülmüş olması şeklinde sıralanabilir.
##Performans
Yüzlerce evin genellikle bir tek trafoya bağlı olduğunu düşünürsek, teorik olarak ağımızın çok geniş bir kapsama alanı olacağını düşünebiliriz. Ancak pratikte birtakım doğal engeller söz konusu. Örneğin evin girişindeki elektrik sayacı bile veri sinyalini genellikle sayacın ötesinde problemsiz alınamayacak kadar zayıflatmaktadır.
Özellikle kısıtlı bağlantı kalitesine sahip powerline ağlarında eklenen her HomePlug cihazı performansı olumsuz yönde etkilemektedir. Bir ağ üzerindeki gönderici konumunda iki istemcinin erişim isteğinin birbiriyle çakışması durumunda veri paketleri kaybolur. Bu durum alıcı tarafından tespit edildiğinde eksik veya sorunlu paketlerin tekrar gönderilmesi talep edilir. Çakışmaların devamını önlemek için gönderici tarafı yeni gönderme denemesinde bulunmadan önce rastgele belirlenmiş bir süre boyunca bekler. Eklenen her cihaz potansiyel bir çakışma anlamına geldiğinden, paketlerin sorunlu iletilme ihtimali artar bu durum veri aktarım hızını etkiler.
##Güvenlik
Performans başlığı altında da bahsettiğimiz gibi, powerline ağlarının kapsama alanı genellikle elektrik sayacının iç tarafında kalmaktadır. Teorik olarak ağınıza sızmak isteyen birinin bilgisayarlarınızın bağlı olduğu elektrik hattına ulaşması gerekir ve bu açıdan powerline ağlarının oldukça güvenli olduğunu düşünebiliriz. Ancak pratikte kablolarınız komşularınızla aynı boruya döşenmişse yalıtımsız elektrik hatları birbirinden etkilenebilir ve verilerinize komşunuzun elektrik hatlarından da ulaşılabilmesi gibi potansiyel bir risk oluşur. Bununla birlikte powerline ağlarının elektrik sayacını kesinlikle geçemeyeceğini de söyleyemeyiz. Sistemin sayacın öteki tarafı ile ağ kurmak için pek elverişli olmaması sayacın ötesine hiçbir veri geçemeyeceği anlamına gelmez. Bu yüzden kablolama yapısına güvenip herhangi bir şifreleme kullanmamak pek mantıklı değil. HomePlug standardında güvenlik 56-bit DES şifrelemesi ile veya 128-bit AES şifrelemesi gibi yöntemlerle sağlanır. DES şifrelemesinde her ne kadar 256 farklı mümkün anahtar olmasına rağmen günümüzün gelişen işlemcilerini göz önünde bulundurduğumuzda kırılamaz bir şifreleme yöntemi olduğunu söylemek zor olur.
##Kullanım
Powerline ağlar ofis ve okul gibi mekânlarda duvarlar nedeniyle zayıflayan kablosuz ağlara bir alternatif olarak kullanılabileceği gibi kablosuz ağları destekleme amaçlı da kullanılabilir. PowerPacket teknolojisinin kablosuz ve HomePNA (Home Phoneline Networking Alliance) çözümleriyle uyumlu olması, powerline ağları multi-teknolojili ağlarda backbone olarak kullanmayı ideal bir seçenek yapıyor. Kablosuz ağları her ne kadar “kablosuz” da olsa, erişim noktası cihazları bir yere takılı olmak durumundadır. Kablosuz erişim noktalarını elektrik prizi dışında bağlantıya ihtiyaç duyulmadan powerline ağına dahil edebiliriz. Akıllı evler,ev içi ağlar ve araç içi ağlarda da PLC sistemleri kullanılabilir.
Powerline ağlar internet erişimi amaçlı da kullanılabilir. Elektrik Hatları Üzerinden Geniş bant (Broadband over Power Lines - BPL) olarak da bilinen powerline üzerinden internet erişimi konusunu aşağıdaki alt başlık altında inceleyeceğiz.
####Broadband over Power Lines (BPL)
Elektrik hatlarının bütün dünyayı kuşatmış olması, hatta telefon hatlarının ulaşmadığı yerlere bile elektrik hatlarının ulaşması akıllara elektrik hatlarını internet taşıyıcısı olarak kullanmayı getirmektedir. Ancak elektrik ağı sadece kablolardan oluşmamakta; transformatörler, trafolar, jeneratörler ve diğer dağıtıcı bileşenler de bu ağda yer almaktadır.
Elektrik üretim tesisinden çıkan elektrik önce iletim trafolarından geçerek yüksek gerilim hatlarında iletilmektedir. Bu durum elektrik hatları üzerinden genişbant veri iletimini zorlaştırmaktadır. Yüksek gerilim hatlarındaki gerilimin 155.000 – 765.000 volt arasında olmasından dolayı bu hatlar doğrudan veri iletimi için uygun değildir. Verinin düzgün bir biçimde iletilmesi için elektrik dalgasının ve radyo dalgasının tutarlı bir frekansta olması gerekir, binlerce voltluk gerilimde bu tutarlılığı bekleyemeyiz ve ani yükseliş ve düşüşler veri iletiminde parazitlere sebep olur.
BPL bu soruna yüksek gerilim hatları yerine orta gerilim hatları ve fiber optik kabloları kullanarak çözüm getirir. Orta gerilim hatları üzerinde verinin uzun mesafelerde iletilebilmesi için hatta tekrarlayıcı (repeator) görevi gören cihazlar yerleştirilir.
Basit bir elektrik sayacı bile veri iletimini olumsuz yönde etkilerken, elektrik gerilimini 7200 volttan 240 volta düşüren trafodan veri sinyalinin geçmesi mümkün değildir. Bu yüzden trafo üzerinde bir veri yolu oluşturmak için bağlayıcılara (coupler) ihtiyaç duyulur. Bu cihazlar verinin orta gerilim hatlarından düşük gerilim ev hatlarına bozulmadan iletilmesini sağlar.
![BPL yöntemi](../img/blog/bpl.gif)

Bu sistemin belki en büyük avantajı, mevcut olan altyapıyı kullanarak az bir maliyetle geniş kitlelere internet hizmeti verilmesine olanak sağlaması. İnternet için elektrik hatlarını kullanan BPL telefon hatlarını kullanan DSL sistemlerine iyi bir alternatif olabilir.
####Kaynaklar

* Işıkdoğan, Furkan. "Powerline Communication." Data Communication Dersi Sunum Raporu. Yıldız Teknik Üniversitesi. 10 Aralık 2009
* "Elektrik Prizinden Veri İletişimi." CHIP Dergisi Haziran 2003: sf 50-58.