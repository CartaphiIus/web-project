import numpy as np  # Matematiksel hesaplamalar için
import matplotlib.pyplot as plt  # Grafik çizmek için

# 1. Sabitleri Belirleyelim (Dünya ve Uydu için)
G = 6.67430e-11  # Evrensel çekim sabiti
M = 5.972e24     # Dünya'nın kütlesi (kg)
dt = 60          # Zaman adımı (Sayısal yöntemlerin kalbi: Her hesaplama 60 sn sonrasını bulur)

# 2. Başlangıç Durumu (Konum ve Hız)
# Dünyayı (0,0) noktasına koyuyoruz. Uyduyu ise 7000 km yukarıya.
x, y = 0, 7000000        # Uydunun konumu (metre)
vx, vy = 7500, 0         # Uydunun hızı (m/s)

# Yörüngeyi çizmek için konumları saklayacağımız listeler
x_points = []
y_points = []

# 3. Simülasyon Döngüsü (Sayısal Yöntem: Euler Method)
# Bu döngü 1000 adım boyunca uydunun yeni yerini hesaplayacak
for i in range(1000):
    # Uzaklığı hesapla: r = sqrt(x^2 + y^2)
    r = np.sqrt(x**2 + y**2)
    
    # Çekim İvmesini Hesapla (Newton'un kanunu)
    accel = -G * M / r**2
    ax = accel * (x / r)
    ay = accel * (y / r)
    
    # Hızı Güncelle (v = v + a*dt)
    vx = vx + ax * dt
    vy = vy + ay * dt
    
    # Konumu Güncelle (x = x + v*dt)
    x = x + vx * dt
    y = y + vy * dt
    
    # Yeni konumları listeye ekle
    x_points.append(x)
    y_points.append(y)

# 4. Sonucu Ekrana Çizdirme
plt.figure(figsize=(6,6))
plt.plot(x_points, y_points, label="Uydu Yörüngesi") # Yörünge çizgisi
plt.scatter(0, 0, color='blue', label="Dünya")      # Dünya noktası
plt.axis('equal')
plt.legend()
plt.show()