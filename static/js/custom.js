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
            $('#data-zone').append('<div>')
            if (machine.machine_status == "Free" && machine.time_left == "0") {
                $('#data-zone').append('<img src="../static/images/green_machine.png"/>' + '<p>' + machineJSON + '</p>')
            }
            else if (machine.machine_status == "Free" && machine.time_left != "0") {
                $('#data-zone').append('<img src="../static/images/white_machine.png"/>' + '<p>' + machineJSON + '</p>')
            }
            else if (machine.machine_status == "Out of service") {
                $('#data-zone').append('<img src="../static/images/black_machine.png"/>' + '<p>' + machineJSON + '</p>')
            }
            else if (machine.machine_status == "In use") {
                $('#data-zone').append('<img src="../static/images/red_machine.png"/>' + '<p>' + machineJSON + '</p>')
            }
            $('#data-zone').append('</div>')
            
        })
    }
})