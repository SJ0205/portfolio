//business Table
const tableDelete = document.querySelectorAll('.td-delete');

window.addEventListener('resize', () => {
    let x = window.innerWidth;

    //창업안내(business) 테이블 변동
    if (x <= 750) {
        for (let i = 0; i < tableDelete.length; i++) {
            tableDelete[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < tableDelete.length; i++) {
            tableDelete[i].style.display = 'table-cell';
        };
    };

});