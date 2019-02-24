# About
A web app in greek about board games. 
You can visit the website by clicking [here](https://snf-845181.vm.okeanos.grnet.gr/).

# What can you use it for?
* Discover board games
* Create a profile
* Rate and comment on board games
* Search for board games using the filter section

# Tools
* Django
* Angular
* MySQL
* Nginx
* Gunicorn
* Tested in Mozilla Firefox

# Navigate inside the website

## Find board games
Through the dashboard you can discover many board games from various categories. In case you have preferences you can use the filters section on the left side and get more personalized results.

## Become a Rolling member
By clicking on the pawn icon on the top right of the page you can login to your account. If you do not own an account you can create one by clicking on the text on the bottom. With your account you have the ability to review board games and comment on other users' reviews and exchange opinions.

# Installation
In order to be able to run the app locally you have to follow the instructions bellow.

## Prequisities
### Language
* python

### Tools, frameworks and libraries
* Angular
* mysql-server
* mysqlclient
* djangorestframework
* pillow
* djangorestframework_simplejwt

## Get the code(of course)
### Navigate to the folder you would like your project to be located and write:
```ruby
git clone https://github.com/Argyro-Sioziou/board_games.git
```

## MySQL
### Open MySQL SHELL by writing:
```ruby
mysql -u root -p
```

### Then create your database by running the commands below(you can obviously put the credentials of your preference).
```ruby
CREATE DATABASE djbg CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE USER 'djbg_user'@'localhost' IDENTIFIED BY 'g8nzMktk6@y';

GRANT ALL PRIVILEGES ON djbg.* TO 'djbg_user'@'localhost';
```

### Create site_config.py file in the following path board_games/server/djbg/rolling. Fill it in with the following lines. Don't forget to adjust your credentials.
```ruby
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'djbg',
        'USER': 'djbg_user',
        'PASSWORD': 'g8nzMktk6@y',
        'HOST': '127.0.0.1',
        'OPTIONS': {
            'isolation_level': 'read committed'
        }
    }
}
```
Exit MySQL SHELL.

### Create the tables
Navigate to board_games/server folder to create the tables using the command:
```ruby
python manage.py migrate
```

### Fill the tables with data
Go to board_games/server folder. The first table to be filled will be the Tag table, then the Creator table and finally the Game table. Execute:
```ruby
python manage.py seed_db Tag seed_tags.csv
python manage.py seed_db Creator seed_creators.csv
python manage.py seed_db Game seed_games.csv
```

## Django
Navigate to the board_games/server folder and execute:
```ruby
python manage.py runserver
```
## Angular
In a new cmd navigate to the board_games/client folder and execute:
```ruby
ng serve --open
```

After a few seconds the site should open on your browser. If not visit the url [http://localhost:4200/games](http://localhost:4200/games).
