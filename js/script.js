/*
    Created by David Ghazaryan (in github as 'david262929') 
*/
var form = $('#new_task'),
title = $('#title'), 
desc = $('#desc'),
minutes = $('#minutes'),
date_input = $('#date'),
time_input = $('#time'),
tasker=[];


function Task_new(direction,title_param,desc_param,start_date_param,id){

    this.title = title_param;          // Task title
    this.desc = desc_param;            // Task description
    this.create_task_date = start_date_param;       // Date of creating Task
    this.task_id = id;                 // ID in DOM
    this.direction = direction;        // Direction in database(db) or in DOM
    var self = this;

    // HTML elements create
    this.html_creator = function (){
        div = document.createElement('div');
          div.classList.add("item");
          div.id = self.task_id;

            //title
            div.appendChild(document.createElement('span').appendChild(document.createTextNode('Title')));
            ul = document.createElement('ul');
              h4 = document.createElement('h4');
              h4_text = document.createTextNode(self.title);
                h4.appendChild(h4_text);
                ul.appendChild(h4);
                div.appendChild(ul);

            //timer
            timer_div = document.createElement('div');
            timer_div.classList.add('timer_div');
                
                timer_div.appendChild(document.createElement('span').appendChild(document.createTextNode('Timer\xa0')));
                span = document.createElement('h5');
                span.id = 'timer_of_'+self.task_id;
                self.time_text = self.time_text ? self.time_text : '';
                self.time_text = self.direction == 'expiredTasks' ? 'EXPIRED':self.time_text;
                self.time_text = self.direction == 'completedTasks' ? 'COMPLATED':self.time_text;
                span_text = document.createTextNode(self.time_text);
                  span.appendChild(span_text);
                  timer_div.appendChild(span);
            div.appendChild(timer_div);

            ///description
            div.appendChild(document.createElement('span').appendChild(document.createTextNode('Description')));
            ul = document.createElement('ul');
                ul.appendChild(document.createElement('h5').appendChild(document.createTextNode(self.desc)));
                div.appendChild(ul);

            //created date
            div.appendChild(document.createElement('span').appendChild(document.createTextNode('Created in')));
            ul = document.createElement('ul');
                ul.appendChild(document.createElement('h4').appendChild(document.createTextNode(self.create_task_date)));
                div.appendChild(ul);

            //comolate button
            if(self.direction == 'progresTasks'){
                button = document.createElement('button');
                button.id = 'button_of_'+self.task_id;
                button_text = document.createTextNode("Complate");
                  button.appendChild(button_text);
                    button.addEventListener('click',function () {
                        button_self = this;
                        button_self.innerHTML = 'Loading...';
                        self.direction = 'completedTasks'; 

                        //request sending when click on button COMPLATE
                        send_to_db = {};
                        send_to_db.change_direction = true;
                        send_to_db.direction = self.direction;
                        send_to_db.id_in_tasks = self.task_id;

                        sendRequestJquery('POST','./api/task.php',send_to_db,function(response){
                            if (response.success) {  

                                self.change_direction_timer_to_stop(self.direction,document.getElementById(self.task_id));
                                button_self.parentNode.removeChild(button_self);
                                self.time_text = 'COMPLATED';
                                $("#timer_of_"+self.task_id).html(self.time_text);
                                clearInterval(self.interval); 

                            }else if(response.success==false){
                                button_self.innerHTML = 'Not complited'; 
                                setTimeout(function(){
                                    button_self.innerHTML = 'Complate';
                                },1000);
                            }
                        });

                    });
                    div.appendChild(button);
            }else if(self.direction == 'completedTasks'){
                self.time_text = 'COMPLATED';
                $("#timer_of_"+self.task_id).html(self.time_text);
            }

            // delete button
            button = document.createElement('button');
            button.classList.add('delete_button');
                  button.appendChild(document.createTextNode("Delete"));
                    button.addEventListener('click',function () {
                        button_self = this;
                        button_self.innerHTML = 'Loading...';

                        //request sending when click on button DELETE
                        send_to_db = {};
                        send_to_db.delete_item = true;
                        send_to_db.id_in_tasks = self.task_id;

                        sendRequestJquery('GET','./api/task.php',send_to_db,function(response){
                            if (response.success) {    
                                document.getElementById(self.task_id).parentNode.removeChild(document.getElementById(self.task_id));
                                clearInterval(self.interval); 
                            }else if(response.success==false){
                                button_self.innerHTML = 'Not deleted'; 
                                setTimeout(function(){
                                    button_self.innerHTML = 'Delete';
                                },1000);
                            }
                        });

                    });
                    div.appendChild(button);

        return div;
    
    }
    this.timer = function(){        
        between = new Date(self.create_task_date).getTime() - new Date().getTime();

        s = Math.floor((between % (1000 * 60)) / 1000);
        m = Math.floor((between % (1000 * 60 * 60)) / (1000 * 60));
        h = Math.floor((between % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        d = Math.floor(between / (1000 * 60 * 60 * 24));
        d = d!=0 ? d+'-Days ':''; 
        h = h<=9 ? '0'+h:  h;
            h = h!=0 ? h+':':'00:'; 
        m = m<=9 ? '0'+m:  m;
            m = m!=0 ? m+':':'00:'; 
        s = s<=9 ? '0'+s:  s; 
            s = s!=0 ? s:'00';  

        self.time_text = d + h + m + s;
        
        $("#timer_of_"+self.task_id).html(self.time_text);
        
        if (between <= 0) {
            self.time_text = "EXPIRED";
            clearInterval(self.interval);
            self.change_direction_timer_to_stop('expiredTasks',self.my_div_with_elems);
            $("#timer_of_"+self.task_id).html('EXPIRED');
            document.getElementById("button_of_"+self.task_id).parentNode.removeChild(document.getElementById("button_of_"+self.task_id));
        }

        
    }
    //elemnti tegh@ poxoghne
    this.change_direction_timer_to_stop = function(pos,what){ /// dardznel e petq che
        //sik kjnje ira hin teghic
        $('#'+self.task_id).parent().remove('#'+self.task_id);
        self.direction = pos; 
        $("#"+pos).append(what);

        send_to_db = {};
        send_to_db.change_direction = true;
        send_to_db.direction = self.direction;
        send_to_db.id_in_tasks = self.task_id;
        sendRequestJquery('POST','./api/task.php',send_to_db,function(response){});       

    }
    // fisrt call it
    this.start_timer = function (){

        
        // all created elems save in variable and append to DOM
        self.my_div_with_elems = self.html_creator();
        $('#'+self.direction).append(self.my_div_with_elems);

        if(self.direction=='progresTasks'){
            this.interval = setInterval(function(){
                self.timer();
            },1000);
        }

    }

}
function create_task () {

    $('#date').attr({
        "min" : format_date_y_m_d(new Date()),
        'value' : format_date_y_m_d(new Date())
    }); 


    $("#create").text('Loading...');
    _do = true;

    if (!validate_text(title.val()) || title.val().length >= 25) {
        title.next().html('Require 3-25 symbols');_do=false;
    }else title.next().html('');

    if (!validate_text(desc.val())  || title.val().length >= 250) {
        desc.next().html('Require 3-250 symbols');_do=false;
    }else desc.next().html('');

    if (!date_input.val() || date_input.val() == '') {
        date_input.next().html('Require date');_do=false;
    }else date_input.next().html('');

    if (_do) {
        //random creating id for TASK
        var id = id_generator();
        time = time_input.val() ? time_input.val() :'24:00';
        var start_date = date_input.val() + ' ' + time;

        send_to_db = {};
        send_to_db.add = true;
        send_to_db.title = title.val();
        send_to_db.desc = desc.val();
        send_to_db.start_date = start_date;
        send_to_db.direction = 'progresTasks';
        send_to_db.id_in_tasks = id;

        sendRequestJquery('POST','./api/task.php',send_to_db,function(response){
            if (response.success) {
                var task = new Task_new('progresTasks', title.val() , desc.val() ,start_date , id );
                task.start_timer();
                tasker.push(task);
                //inputneri mijin@ kjnje
                title.val('');desc.val('');date_input.val(format_date_y_m_d(new Date()));time_input.val('');
            }
            $("#create").text('Create Task');
        });
    }else{
        $("#create").text('Create Task');
    }
}


$("#create").bind('click', create_task);

form.keypress(function(e) {
    // if press key ENTER call create_task(function)
    if(e.which == 13) {
        create_task ();
    }
});























/*
    Created by David Ghazaryan (in github as 'david262929') 
*/