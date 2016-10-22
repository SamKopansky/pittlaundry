$(document).ready(function() {
    $('#dorm-select').submit(function(e) {
        e.preventDefault()
        dorm = $(this).serialize()
        console.log(dorm)
        $('#data-zone').html('<img src="static/images/ring.gif"/>')
        $.post('/get-raw-data', dorm, function(data) {
            $('#data-zone').empty()
            displayMachines(data)
        })
    })
    
    function displayMachines(machines) {
        machines.forEach(function(item, index) {
            machineJSON = JSON.stringify(item)
            machine = JSON.parse(machineJSON)
            status = machine.machine_status
            timeLeft = machine.time_left
            
            $('#data-zone').append('<div>')
            if (status == "Free" && timeLeft == "0") {
                $('#data-zone').append('<p><img src="../static/images/green_machine.png"/>Free</p>')
            }
            else if ((status == "Free" && timeLeft != "0") || (status == "In use" && timeLeft == "0")) {
                $('#data-zone').append('<p><img src="../static/images/white_machine.png"/>Done, but clothes are still in the machine</p>')
            }
            else if (status == "Out of service") {
                $('#data-zone').append('<p><img src="../static/images/black_machine.png"/>Broken</p>')
            }
            else if (status == "In use") {
                $('#data-zone').append('<p><img src="../static/images/red_machine.png"/>Time left: ' + timeLeft + ' minutes</p>')
            }
            $('#data-zone').append('</div>')
            
        })
    }
})