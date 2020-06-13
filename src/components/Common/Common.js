import moment from 'moment';
import { notification } from 'antd';

let color = window['colors'];

export const notify = (type, data, duration = 4.5) => {
    notification[type]({
        message: 'Thông báo',
        description: data,
        duration: duration
    });
};

export const warningConsole = ()=>{
    console.log("%cStop!!! You are unauthorized acces", "color: red; font-size: 40px; font-weight: bold;");
}

export const convertTextDecimal = (number)=>{
    if(typeof number === 'number'){
        number = number.toFixed(0);
        return parseInt(number).toLocaleString(undefined, {maximumFractionDigits:2});
    }
    return number;
}

//set color 
//floor: sàn, ref: tham chiếu, ceiling: trần
export const setColor = (obj)=>{
    let cl = color._BLACK;
    if(obj.current === obj.ceiling){
        cl = color._PURPLE;
    }
    if(obj.current > obj.ref && obj.current < obj.ceiling){
        cl = color._GREEN;
    }
    if(obj.current === obj.ref){
        cl = color._ORANGE;
    }
    if(obj.current > obj.floor && obj.current < obj.ref){
        cl = color._RED_VCSC;
    }
    if(obj.current === obj.floor){
        cl = color._BLUE;
    }
    return cl;
}

export const setColorRatio = (current)=>{
    let cl = color._BLACK;
    if(current > 0){
        cl = color._GREEN;
    }
    if(current < 0){
        cl = color._RED_VCSC;
    }
    return cl;
}

//Định dạng input number ngăn cách dấu phẩy
export const formatterNumber = (value)=>{
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const parserNumber = (value)=>{
    return value.replace(/\$\s?|(,*)/g, '');
}

//tách chuỗi ngày convert qua date
export const splitStringDate = (a)=>{
    try {
        let b = "/";
        let tmp1 = [a.slice(0, 4), b, a.slice(4)].join('');
        let tmp2 = [tmp1.slice(0, 7), b, tmp1.slice(7)].join('');
        return new Date(tmp2).toISOString();
    } catch (error) {
        
    }
}

//convert date to format yyyyMMdd
export const dateToYYYYMMDD = (fromDate)=>{
    try {
        let d = new Date(fromDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('');
    } catch (error) {
        
    }
}

//convert string to time
export const stringToTimeHHMMSS = (time)=>{
    try {
        return moment(time, 'HH:mm:ss').add(7, 'hours').format("hh:mm:ss"); //convert fomat time zone, after add 7h
    } catch (error) {
        
    }
}

export const statusOrderHistory = (obj)=>{
    if(obj.unmatchedQuantity === 0){
        if(obj.orderStatus === 'FULL_FILLED')
            return {status: 'Khớp hết', color: color._GREEN}
        return {status: 'Hủy', color: color._GREY_999};
    }else{
        if(obj.orderStatus === 'RECEIPT')
            return {status: 'Tiếp nhận', color: color._ORANGE};
        return {status: 'Chờ khớp', color: color._ORANGE};
    }
}

//compare time current with time trade (2h30)
export const compareTimeTradeValid = ()=>{
    let timeCurrent = new Date().getTime(); //Time hiện tại
    let timeValidPM = new Date().setHours(14,30,0,0); //Thời gian 14h30
    let timeValidAM = new Date().setHours(9,0,0,0); //Thời gian 9h00
    if(timeCurrent > timeValidAM && timeCurrent < timeValidPM)
        return true;
    return false;
}