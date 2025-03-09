$(document).ready(function () {
    $.getJSON('json/remote-courses.json', function (data) {
      var tableBody = $('#remoteCoursesTable tbody');
      $.each(data, function (index, course) {
        var row = '<tr>' +
          '<td>' + course.courseCode + '</td>' +
          '<td>' + course.courseTitle + '</td>' +
          '<td>' + course.duration + '</td>' +
          '<td>' + course.description + '</td>' +
          '<td><a href="' + course.bookingLink + '" target="_blank" class="btn btn-sm btn-primary">Book Now</a></td>' +
          '</tr>';
        tableBody.append(row);
      });
    }).fail(function () {
      $('#remoteCoursesTable tbody').append('<tr><td colspan="8" class="text-center">Unable to load course data.</td></tr>');
    });
  });
  