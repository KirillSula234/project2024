var Cal = function(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
      'Пн',
      'Вт',
      'Ср',
      'Чтв',
      'Птн',
      'Суб',
      'Вск'
    ];
    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
  };
  // Переход к следующему месяцу
  Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
  };
  // Переход к предыдущему месяцу
  Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
  };
  // Показать текущий месяц
  Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
  };
  // Показать месяц (год, месяц)
  Cal.prototype.showMonth = function(y, m) {
    var d = new Date()
    // Первый день недели в выбранном месяце 
    , firstDayOfMonth = new Date(y, m, 7).getDay()
    // Последний день выбранного месяца
    , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
    // Последний день предыдущего месяца
    , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // заголовок дней недели
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // Записываем дни
    var i=1;
    do {
      var dow = new Date(y, m, i).getDay();
      // Начать новую строку в понедельник
      if ( dow == 1 ) {
        html += '<tr>';
      }
      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth+1;
        for(var j=0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      // Записываем текущий день в цикл
      var chk = new Date();
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        html += '<td class="today">' + i + '</td>';
      } else {
        html += '<td class="normal">' + i + '</td>';
      }
      // закрыть строку в воскресенье
      if ( dow == 0 ) {
        html += '</tr>';
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if ( i == lastDateOfMonth ) {
        var k=1;
        for(dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>';
          k++;
        }
      }
      i++;
    }while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
  };
  // При загрузке окна
  window.onload = function() {
    // Начать календарь
    var c = new Cal("divCal");			
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };
  }
  // Получить элемент по id
  function getId(id) {
    return document.getElementById(id);
  }

function NONE(ele) {
    var btnForm = document.getElementById('nextBtnForm');
    var infodiv1 = document.getElementById('info1');
    var infodiv2 = document.getElementById('info2');
    var calendar = document.getElementById('cal');
    var prev = document.getElementById('Prev');
    var FinalDiv = document.getElementById('finalInfo');
    var vals = document.getElementById('vals');
    if (btnForm.textContent == 'OK') {location.href='./index.htm'} else {
      if (btnForm.classList.contains('final')) {
          FinalDiv.style.display = 'none';
          btnForm.textContent = 'OK';
          infodiv1.innerHTML = '<h2>Вы записаны к врачу ' + document.getElementById('doc').value +' на ДАТА</h2>';
          infodiv1.style.display = 'block';
          prev.style.display = 'none';
    } else {if (btnForm.classList.contains('one')) {
        calendar.style.display = 'none';
        FinalDiv.style.display = 'flex';
        vals.innerHTML = '<h2>'+document.getElementById('guz').value+'</h2><h2>'+document.getElementById('section').value+'</h2><h2>'+document.getElementById('doc').value+'</h2><h2>---</h2><h2>---</h2>';
        btnForm.classList.add('final');
        btnForm.textContent = 'Верно'
    } else {
        btnForm.classList.add('one')
        infodiv1.style.display = 'none';
        infodiv2.style.display = 'none';
        calendar.style.display = 'block';
        prev.style.display = 'inline';
    }; } 
}}

function prevRec(ele) {
  var btnForm = document.getElementById('nextBtnForm');
  var infodiv1 = document.getElementById('info1');
  var infodiv2 = document.getElementById('info2');
  var calendar = document.getElementById('cal');
  var prev = document.getElementById('Prev');
  var FinalDiv = document.getElementById('finalInfo');
  if (btnForm.classList.contains('final')) {
    btnForm.textContent = 'Далее';
    calendar.style.display = 'block';
    btnForm.classList.remove('final');
    FinalDiv.style.display = 'none';
  } else {
      if (btnForm.classList.contains('one')) {
        prev.style.display = 'none';
        calendar.style.display= 'none';
        infodiv1.style.display = 'flex';
        infodiv2.style.display = 'block';
        btnForm.classList.remove('one');
    }
  };

}