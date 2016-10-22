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
            machine = JSON.parse(JSON.stringify(item))
            $('#data-zone').append('<div')
            if (machine.machine_status.equals("Free")) {
                $('#data-zone').append('<img src="../static/images/original.png"/>' + '<p>' + JSON.stringify(item) + '</p>')
            }
            
        })
    }
})