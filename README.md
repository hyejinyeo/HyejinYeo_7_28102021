# OpenClassrooms Projet 7 : GROUPOMANIA

Le dernier projet de la formation développeur web d'OpenClassrooms. Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. 




## Technologies utilisées

HTML, CSS, JavaScript\
Vue.js, Vuex, Vuetify, Axios\
Node.js, Express, Sequelize\
MySQL


## Instruction

### Prérequis
- Vous devrez avoir Vue CLI, Node.js et MySQL installés localement sur votre machine.
- Créez un dossier vide et clonez ce repository à l'intérieur.

```bash
git clone https://github.com/hyejinyeo/HyejinYeo_7_28102021.git
```


### Base de données
1. Connectez à MySQL et créez une base de données.
```bash
CREATE DATABASE groupomania;
```
2. Configurez le nom d'utilisateur et le mot de passe.

**Option A**

La base de données est configurée avec le nom d'utilisateur 'OCP7Hyejin' et un mot de passe 'Projet7Hyejin'. Créez un utilisateur et lui donnez tous les privilèges avec les commandes suivantes :
```bash
CREATE USER 'OCP7Hyejin'@'groupomania' IDENTIFIED BY 'Projet7Hyejin';
GRANT ALL PRIVILEGES ON * . * TO 'OCP7Hyejin'@'groupomania';
```

**Option B**

Modifiez le nom d'utilisateur et le mot de passe du fichier ```backend > config > "config.json"``` afin de faire correspondre vos informations d'identification MySQL locales.

3) Importez la base de données avec les exemples du fichier ```"groupomania.sql"```
```bash
mysql -u OCP7Hyejin -p groupomania < groupomania.sql
```


### Backend

1) Ouvrez le dossier "backend" dans un premier terminal et exécutez la commande :
```bash
npm install
```
2) Puis exécutez la commande :
```bash 
npx nodemon server
```
Vous aurez un message comme celui-ci sur votre terminal :
```bash
Executing (default): .......
Listening on port 3000
```

?
```bash
npx sequelize
sequelize-cli db:create
sequelize-cli db:migrate
```
?


### Frontend

1) Ouvrez le dossier "frontend" dans un autre terminal et exécutez la commande :
```bash
npm install
```
2) Puis exécutez la commande :
```bash
npm run serve
```
Vous aurez un message similaire à celui-ci :
```bash
App running at:       
- Local:   http://localhost:8080/
- Network: http://192.168.1.39:8080/ 
```
3) Ouvre zvotre navigateur et allez sur : [http://localhost:8080/](http://localhost:8080/)

**Utilisateur administrateur**  ```email : admin@groupomania.com```  ```password : Admin123!```
