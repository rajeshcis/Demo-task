#### There are 3 API's in which two of them are public API and one is private API.

The application have:
- 3 countries codes are 11,12 and 13
- 3 panel provider, there codes are panel001, panel002 and panel003
- 4 Location Groups
- 16 Target groups
- 20 Locations

#### Request #1
* 1 - GET  locations/:country_code:
	The first API is '/api/locations/<int:country_code>/' in which it take country code and will return all the location which belong to the panel code which is in country of that country code.

#### Request #2
* 2 - GET  target_groups/:country_code
	The second API is '/api/targetgroup/<int:country_code>/' in which it take country code and will return all the targetgroups which belong to the panel code which is in country of that country code.

#### Request #3
* 3 - POST evaluate_target
	The last API is private API which need authentication to access that API. Url is '/api/calculate-price/' it takes the country code and target group id which retun the panel price from the panel provider code.

#### Example:
country code -11 and target group id - 1 -- will give price of first panel001
country code - 13 and target group id - 4    -- will give price of second panel002
country code - 12 and target group is - 9    -- will give price of thrird panel003

#### For configration of project:
* Need to make an virtual enviroment with python 3.5+ and then need to install the requirements.txt.
* You can also create a user with python manage.py createsuperuser --email <email> --username <username>
* To start the server python manage.py runserver.
* There is already the sqlite database which contain all the specified data.