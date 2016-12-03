$(document).ready(function() {
    $('#dorm-select').submit(function(e) {
        e.preventDefault()
        dorm = $(this).serialize()
        console.log(dorm)
        $('#data-zone').html('<img id="loading-wheel" src="static/images/ring.gif"/>')
        $.post('/get-raw-data', dorm, function(data) {
            $('#data-zone').empty()
            displayMachines(data, dorm)
        })
    })
    
    function displayMachines(machines, dorm) {
        dorm = dorm.split('=')[1]
        $.get('/get-laundry-layout', {'dorm-name': dorm},function(pagehtml) {
            $('#data-zone').html(pagehtml)
            for (var i = 0; i < machines.length; i++) {
                machineJSON = JSON.stringify(machines[i])
                machine = JSON.parse(machineJSON)
                status = machine.machine_status
                timeLeft = machine.time_left
                
                if (document.getElementById('machine' + (i + 1)) != null) { 
                    console.log("this happened " + i)
                    if (status == "Free" && timeLeft == "0") {
                        $('#machine' + i).attr('src', '../static/images/green_machine.png')
                    }
                    else if ((status == "Free" && timeLeft != "0") || (status == "In use" && timeLeft == "0")) {
                        $('#machine' + i).attr('src', '../static/images/white_machine.png')
                    }
                    else if (status == "Out of service") {
                        $('#machine' + i).attr('src', '../static/images/black_machine.png')
                    }
                    else if (status == "In use") {
                        $('#machine' + i).attr('src', '../static/images/red_machine.png')
                    }
                }
            } 
        })   
    }
})