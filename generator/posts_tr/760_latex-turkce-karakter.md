LaTeX Türkçe karakter sorunu ve çözüm önerileri
2012-12-18
Programlama
LaTeX ile hazırladığınız dökümanlarınızdaki Türkçe karakter sorunu bu yazıdaki yöntemler kolaylıkla çözülebilir.
http://www.isikdogan.com/img/blog/latex.png
---
LaTeX ile hazırladığınız dökümanlarınızdaki Türkçe karakter sorunu aşağıdaki paket dökümana eklenerek kolaylıkla çözülebilir.

	\usepackage[utf8x]{inputenc}
	
Bir başka yöntem ise Türkçe karakterlerin karşılıklarını doğrudan dökümanda kullanmak olabilir (örneğin ç yerine \c{c}). Az önce C# ile kodladığım aşağıdaki linkteki küçük yazılımı kullanarak kolayca metinlerinizi kolayca bu formata çevirebilirsiniz.

><a class="btn btn-primary" href="http://www.isikdogan.com/files/software/TurkceKarakter.zip"><span class="fa fa-cloud-download fa-lg"></span>&nbsp;&nbsp;&nbsp;İndir</a>

Programın kaynak kodları da oldukça kısa, tek yaptığım iki metin alanı ve bir butondan oluşan bir form oluşturmak ve buton için aşağıdaki fonksiyonu yazmak oldu:

	private void convertButton_Click(object sender, EventArgs e)
	{
	   String s = inputText.Text;
	   s = s.Replace("ğ","\\u{g}");
	   s = s.Replace("Ğ", "\\u{G}");
	   s = s.Replace("ç", "\\c{c}");
	   s = s.Replace("Ç", "\\c{C}");
	   s = s.Replace("ş", "\\c{s}");
	   s = s.Replace("Ş", "\\c{S}");
	   s = s.Replace("ü", "\\\"{u}");
	   s = s.Replace("Ü", "\\\"{U}");
	   s = s.Replace("ö", "\\\"{o}");
	   s = s.Replace("Ö", "\\\"{O}");
	   s = s.Replace("ı", "{\\i}");
	   s = s.Replace("İ", "\\.{I}");
	   outputText.Text = s;
	}
	
