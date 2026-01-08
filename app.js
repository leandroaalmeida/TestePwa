$(document).ready(() => {

  // 📷 CÂMERA
  $('#btnCamera').on('click', async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      $('#video')[0].srcObject = stream;
    } catch (e) {
      alert('Erro ao acessar câmera');
      console.error(e);
    }
  });

  // 📍 LOCALIZAÇÃO
  $('#btnLocation').on('click', () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        $('#output').text(
          `Latitude: ${pos.coords.latitude}\nLongitude: ${pos.coords.longitude}`
        );
      },
      err => alert('Erro ao obter localização')
    );
  });

  // 📱 ACELERÔMETRO
  $('#btnMotion').on('click', async () => {
    // iOS precisa pedir permissão explícita
    if (typeof DeviceMotionEvent?.requestPermission === 'function') {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission !== 'granted') return;
    }

    window.addEventListener('devicemotion', event => {
      const acc = event.accelerationIncludingGravity;
      $('#output').text(
        `X: ${acc.x?.toFixed(2)}\nY: ${acc.y?.toFixed(2)}\nZ: ${acc.z?.toFixed(2)}`
      );
    });
  });

  // SERVICE WORKER
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

});
