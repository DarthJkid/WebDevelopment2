$(document).ready(function() {
    $.getJSON('data/events.json', function(data) {
      var eventsTableBody = $('#eventsTable tbody');
      $.each(data, function(index, event) {
        var row = '<tr>' +
          '<td>' + event.name + '</td>' +
          '<td>' + event.date + '</td>' +
          '<td>' + event.location + '</td>' +
          '<td>' + event.description + '</td>' +
          '<td><a href="' + event.bookingLink + '" target="_blank" class="btn btn-sm btn-primary">Book</a></td>' +
          '</tr>';
        eventsTableBody.append(row);
      });
    }).fail(function() {
      $('#eventsTable tbody').append('<tr><td colspan="5" class="text-center">Unable to load events data.</td></tr>');
    });
  });