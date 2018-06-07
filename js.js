/* Поиск адреса в Google Map */
    var autocomplete;

    function initAutocomplete() {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('edit-field-business-location-und-0-value')),
        {
          types: ['(regions)'],
          componentRestrictions: { country: ["ru","ua","by"] }
        }
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', fillInAddress);
    }

    /* Можно использовать для заполнения нужных полей */
    function fillInAddress() {
      // Get the place details from the autocomplete object.
      var location;
      var place = autocomplete.getPlace();
      if(place.geometry !== undefined) {
        location = place.address_components;
        location.forEach(function(item, i, location){
          switch(item.types[0]) {
            case 'locality':
              $('#edit-field-business-locality').find('input').val(item.long_name);
              break;
            case 'administrative_area_level_1':
              $('#edit-field-business-admin-area-1').find('input').val(item.long_name);
              break;
            case 'administrative_area_level_2':
              $('#edit-field-business-admin-area-2').find('input').val(item.long_name);
              break;
            case 'country':
              $('#edit-field-business-country').find('input').val(item.long_name);
              break;
          }
        });

        /* Coords */
        $('#edit-field-business-location-lat').find('input').val(place.geometry.location.lat());
        $('#edit-field-business-location-lng').find('input').val(place.geometry.location.lng());
      }
    }

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    function geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    }
    /* Конец функционала поиска в Google Map */