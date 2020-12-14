(function(window, document, undefined) {
  'use strict';

  // Define the widget collection.
  var collection = null;

  // Documentation: https://docs.morphii.com/widget_documentation_2_0.html
  // Define the morphii ids that will be used in the widgets.
  // Publicly available: https://docs.morphii.com/morphii_list.html
  var morphiiIds = [
    { id: '6533704109450043392_2' },
    //{ id: '6533717691772903424' },
    //{ id: '6533717823323430912' },
    //{ id: '6533717983040057344' },
    //{ id: '6533718112033349632' },
    { id: '6533718265862295552' }//,
    //{ id: '6533723337566945280' }
  ];

  // Setup the widget when the page is ready.
  window.onload = function() {
    createWidget();
  }
  document.getElementById("widget-q1").addEventListener("click", someFunction);


  // Define the widget options.
  function widgetOptions(qId) {
    return {
	
      div_id: 'widget-' + qId,
      morphii: {
        ids: morphiiIds,
        show_name: true,  // Set to `false` to not display morphii names.
        wrap_name: true
      },
      target : {
        id: qId,
        type : 'question'
      },
      comment: {
        show: false,   // Set to `true` to see comment field.
        required: false
      },
      slider: {
        initial_intensity: 0.0,
        show_animation: true,
        anchor_labels: {
          show: true
        }
      },
      selection: {
        required: true  // Set to `false` to not require selection.
      },
      instructions: {
        show: true
      },
      options: {
        stage: 'test'
      }
    };
  }

  function createWidget() {
    var collectionOptions = {
      client_key: '349ec763-474f-4084-9dcd-b373ddb778cd',
      account_id: '17253015',
      project: {
        id: 'widget-sample',
        description: 'Sample widget code.'
      },
      application: {
        name: 'sample-application',
        description: 'Sample demo of Widget v2.',
        version: '1.0'
      },
      user: {
        id: 'user-id'
      },
      callbacks: {
        error: errorCallback,
        selection_change: selectionChangeCallback
      }
    };

    collection = new MorphiiWidgets.Collection();
    collection.init(collectionOptions, function(error, valid) {
      if (valid === true) {
        // Add the widget to each question on the page.
        ['q1'].forEach(function(qId) {
          var option = widgetOptions(qId);
          collection.add(option, function(error, results) {
            if (error) {
              console.log('Collection add error: ' + JSON.stringify(error, null, 2));
            }
            else {
              var divId = results.configuration.div_id;
              var targetId = results.configuration.target.id;

              // The target id (in the widget options) was set as the element id
              // for the question text.
              var questionText = document.getElementById(targetId).textContent;

              // Add additional metadata to widget.
              collection.addMetadata(divId, 'question_id', targetId);
              collection.addMetadata(divId, 'question', questionText);

              collection.addMetadata(divId, 'foo1', 'bar1');
              collection.addMetadata(divId, 'foo2', 'bar2');
              collection.addMetadata(divId, 'foo3', 'bar3');
            }
          });
        });
      }
      else {
        console.log('Init error: ' + JSON.stringify(error, null, 2));
      }
    });
  }

  // The Collection widget error callback
  function errorCallback(error) {
    console.log('Error callback: ' + JSON.stringify(error, null, 2));
  }

  // Selection Change callback
  function selectionChangeCallback(event) {

  }
  
  function someFunction() {
	  var qnotetxt = document.getElementById('qnote');
	  var qnotetxts = document.getElementById('qnotes');
	  collection.submit(function(error, results) {
        if (error) {
          console.log('Submit results (error): ' + JSON.stringify(error, null, 2));
        }
        else {
			qnotetxt.innerHTML=results[0].reaction_record.morphii.display_name;
			qnotetxts.innerHTML=results[0].reaction_record.morphii.intensity;
			console.log('morphii: ' + results[0].reaction_record.morphii.display_name);
			console.log('morphii intensity: ' + results[0].reaction_record.morphii.intensity);
		}
	})
  }



})(window, document);
