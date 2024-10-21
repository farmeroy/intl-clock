# International Clock

This is a web application to search for and display the local time at your desired location.

The search functionality uses Open Street Map's [Nominatum](https://nominatim.org/) database to fetch the place name along with the latitude and longitude co-ordinates.
The coordinates are then sent to the [time zone api](https://github.com/farmeroy/time-zone-api),
an AWS Lambda function written in Rust which calculates the time zone.

Results are cached on the client.

Check out the app live at [clock.raffaelecataldo.com](https://clock.raffaelecataldo.com).
