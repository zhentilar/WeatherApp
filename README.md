```markdown
# Hava Durumu Uygulaması

Bu proje, React kullanarak geliştirilmiş basit bir hava durumu uygulamasıdır. Kullanıcılar, Visual Crossing API'si aracılığıyla istedikleri şehrin güncel hava durumu bilgilerini öğrenebilirler. Uygulama, sıcaklık, nem oranı, rüzgar hızı ve hava durumu gibi bilgileri kullanıcıya sunar.

## Özellikler

- Şehir adı girerek hava durumu bilgilerini arama.
- Sıcaklık, nem oranı, rüzgar hızı ve hava durumu bilgilerini görüntüleme.
- Hava durumuna göre dinamik arka plan görseli.
- "Hakkında" butonu ile geliştirici bilgilerini gösterme.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzünü oluşturmak için kullanıldı.
- **Bootstrap**: Uygulamanın stilini ve duyarlı tasarımını sağlamak için kullanıldı.
- **Visual Crossing API**: Gerçek zamanlı hava durumu verilerini almak için kullanıldı.

## Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Reposunu klonlayın:

   ```bash
   git clone https://github.com/zhentilar/hava-durumu-uygulamasi.git
   cd hava-durumu-uygulamasi
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Projenin kök dizininde bir `.env` dosyası oluşturun ve Visual Crossing API anahtarınızı ekleyin:

   ```env
   REACT_APP_API_KEY=buraya_api_anahtarınız
   ```

4. Uygulamayı başlatın:

   ```bash
   npm start
   ```

5. Tarayıcınızı açın ve `http://localhost:3000` adresine giderek uygulamanın çalıştığını kontrol edin.

## Kullanım

1. Hava durumu bilgilerini öğrenmek istediğiniz şehri arama kutusuna yazın.
2. "Ara" butonuna basarak ya da "Enter" tuşuna basarak hava durumu verilerini getirin.
3. Sıcaklık, nem, rüzgar hızı ve hava durumu gibi bilgiler ekranda görünecektir.
4. Hava durumuna göre arka plan görseli dinamik olarak değişecektir.
5. "Hakkında" butonuna tıklayarak geliştirici bilgilerini görebilirsiniz.

## Geliştirici Hakkında

- **Ad**: Semih Kartal
- **GitHub**: [zhentilar](https://github.com/zhentilar/)

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.

```

Bu format, GitHub reposuna uygun olup, projenin nasıl kurulacağı ve kullanılacağıyla ilgili gerekli tüm bilgileri içeriyor.
