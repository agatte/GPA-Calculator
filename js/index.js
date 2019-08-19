function getGrade(grade) {
	grade = grade.toLowerCase();
	var qualityScore = 0;
	switch (grade) {
		case 'a':
			qualityScore = 4;
			break;
		case 'b':
			qualityScore = 3;
			break;
		case 'c':
			qualityScore = 2;
			break;
		case 'd':
			qualityScore = 1;
			break;
		default:
			qualityScore = 0;
	}
	return qualityScore;
}

function addRow(numberOfRows) {
  if (!numberOfRows) numberOfRows = 1;
  
  for (var i = 0; i < numberOfRows; i++) {
    $("#grades_table tbody").append(
      $("<tr />").attr("class", "grade_row").append(
        $("<td />")
          .css({
            "font-weight": "bold"
          })
          .text($(".grade_row").length + 1)
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "class_field form-control",
              "name": "class",
            })
        )
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "grade_field form-control",
              "name": "grade",
              "size": "5"
            })
        )
      )
      .append(
        $("<td />").append(
          $("<input />")
            .attr({
              "type": "text",
              "class": "credits_field form-control",
              "name": "credits",
              "size": "3"
            })
        )
      )
    );
  }
}

$(document).ready(function() {
  addRow(5);

  $("#add_row").click(function() {
    addRow();
  });
  
  $("#gpa_form").submit(function(e) {
    e.preventDefault();
    
    var gradePoints = 0.0;
    var totalCredits = 0.0;
    
    $(".grade_row").each(function(i) {
      if ($(this).find(".grade_field").val() == "" || $(this).find(".credits_field").val() == "") {
        return;
      }
      
			if ( isNaN($(this).find(".grade_field").val())) {
				gradePoints += getGrade($(this).find(".grade_field").val()) * parseFloat($(this).find(".credits_field").val());
			} else {
				gradePoints += parseFloat($(this).find(".grade_field").val()) * parseFloat($(this).find(".credits_field").val());
			}

      totalCredits += parseFloat($(this).find(".credits_field").val());
    });
    
    var gpa = gradePoints / totalCredits;
    
    if (gradePoints == 0.0 || totalCredits == 0.0) {
      $("#gpa_output").text("You must enter at least one grade and its corresponding credits.");
    } else if (isNaN(gpa)) {
      $("#gpa_output").text("Could not calculate GPA. Did you input a non-decimal grade?");
    } else {
      $("#gpa_output").html("<span style=\"font-weight: bold;\">GPA:</span> " + gpa);
    }
  });
});