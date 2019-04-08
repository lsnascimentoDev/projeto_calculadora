class CalcController {

    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();

    }

    initialize() {


        this.setDisplayDataTime();

        setInterval(() => {

            this.setDisplayDataTime();


        }, 1000);

    }



    setDisplayDataTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }




    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = (btn.className.baseVal.replace("btn-", ""));

                this.execBtn(textBtn)

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousesown', e => {

                btn.style.cursor = "pointer";


            });

        });
    }


    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })

    }




    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll();

                break;

            case 'ce':
                this.clearEntry();

                break;

            case 'soma':

                this.addOperation("+");

                break;

            case 'subtracao':

                this.addOperation("-");

                break;

            case 'divisao':

                this.addOperation("/");

                break;

            case 'multiplicacao':

                this.addOperation("*");

                break;

            case 'porcento':

                this.addOperation("%");


                break;


            case 'igual':


                break;


            case 'ponto':

                this.addOperation(".");


                break;


            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':

                this.addOperation(parseInt(value));
                break;




            default:
                this.setError();

                break;

        }


    }


    clearAll() {

        this._operation = [];
    }

    clearEntry() {

        this._operation.pop();

    }


    isoperator(value) { // verifica se é um operador ou não 

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1); //indexOf vai buscar o valor no array, se achar ele retorna o indice , mas pelo contrário retorna -1, depois verifica se é maior que 1, retornando true ou false


    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;


    }


    pushOperation(value) {

        this._operation.push(value);

        if(this._operation.length > 3){ // verifica a quantidade de valores no array para realização de calculos parcias

            console.log(this._operation)

        }

    }

    addOperation(value) {

        console.log('A', isNaN(this.getLastOperation()));

        if (isNaN(this.getLastOperation())) { // é um número ?

            //se não for, cai aqui  
           // console.log("danadinho", this.getLastOperation());
            if (this.isoperator(value)) { // é um operador ?
                //console.log('caiu aqui 1',value);
                //se for, cai aqui
                this.setLastOperation(value);// troca operador

            } else if (isNaN(value)) {
                //console.log(' caiu aqui  2',value);

                console.log('outra coisa', value);

            } else {// é um numero

             //   console.log('caiu aqui 3', value);

                this.pushOperation(value);
            }

        } else {

            if (this.isoperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

            }
        }

    }


    getLastOperation() {

        return this._operation[this._operation.length - 1];


    }



    setError() {
        this.displaycalc = "Error";
    }









    get displaycalc() {
        return this._displayCalcEl.innerHTML;
    }


    set displaycalc(value) {
        this._displayCalcEl.innerHTML = value;
    }



    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }



    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;

    }


    get currentDate() {
        //let data = new Date("pt-br");
        //console.log(data);
        return new Date();
    }

    set currentDate(value) {
        this.currentDate = value;
    }



}