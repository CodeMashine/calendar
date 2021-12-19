'use strict';

const main = document.querySelector('.main');

const days = document.querySelector('.days');

const currentYear = document.querySelector('.currentYear');

const currentMonth = document.querySelector('.currentMonth');

const date = new Date();

function render(date) {
    days.innerHTML='' ;
    let year = date.getFullYear();
    currentYear.innerText = currentYear.dataset.year = year;
    
    let month = date.getMonth();
    currentMonth.innerText = date.toLocaleString('rus-ru', {
        month: 'long'
    });
    
    let weekDayArr=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] ;
    
    currentMonth.dataset.month = month;
    
    let yearNum = Number(document.querySelector('.currentYear').dataset.year) ;
    let monthNum = Number(document.querySelector('.currentMonth').dataset.month);
    let daysInMonth = 32 - new Date(yearNum, monthNum, 32).getDate(); // нашел в интернете
    
    let firstDay = new Date(yearNum ,monthNum ,1).toLocaleDateString('eng-gb',{ weekday: 'short' }) ;
    
    let startIndex=weekDayArr.indexOf(firstDay) ;
    let daysInMonthFull = daysInMonth+startIndex;
    
    let weeks = Math.ceil((daysInMonthFull/7));
    for (let i = 0; i < weeks; i++) {
        let tr = document.createElement('tr');
        tr.dataset.weekNum = i;
        for (let j = 0; j < 7; j++) {
            let td = document.createElement('td');
            td.dataset.dayNum = j;
            td.className=weekDayArr[j] ;
            tr.append(td);
        }
        days.append(tr);
        
    }
    
    let tds = document.querySelectorAll('td');

    for(let j=startIndex ,d=1; d<=daysInMonth ; d++){
        tds[j].innerText=d ;
        j++ ;
    }    

    main.addEventListener('click' , changeDate) ;
}

function changeDate(event){
    let target = event.target ;
    let year = Number(document.querySelector('.currentYear').dataset.year) ;
    let month = Number(document.querySelector('.currentMonth').dataset.month);

    if (target.className=='prevYear') year-- ;
    if (target.className=='nextYear') year++ ;
    if (target.className=='prevMonth') month-- ;
    if (target.className=='nextMonth') month++ ;

    let date= new Date(year ,month ,1) ;

    render(date);
}

render(date);