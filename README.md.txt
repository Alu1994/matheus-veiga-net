# Remove Backup Mongo Database

The ***Remove Backup Mongo Database*** is a cronjob executed on our mongo03 server to kill the backup collections on mongodb and the dump files used to upload the old data to our ***s3 backup bucket***, helping us to solve our disk space problem and do not having to do this manually. 
When we implement clickstream in Zap portal, it will not send data to mongodb anymore and maybe we will be able to disable this job.

## Motivation
There is some collections that has a backup job done every month on our mongodb server, with some data that are exported to the SQLSERVER every month as well for the BI team.

After this data export, the old data on this collection is not used anymore, then an existent cronjob renames the collection and creates a dump file for every collection to upload this old unused data to our s3 mongo backup bucket.

### Follow bellow the backup collections

| Banco   | Collection                 |
| ------- | -------------------------- |
| rb	    | imoveis.exposicaorb        |
| zap	    | financiamento.simulacao    |
| zap	    | historico.navegacao        |
| contab  | vitrine.lancamento         |
| contab  | imovel.visualizacaoficha   |
| contab  | imovel.busca               |

## Run

Clone repository

### Install python 3.4

[Install python3.4](https://www.python.org/downloads/)

### Install pip latest version: 

````
python get-pip.py
````

### After install python and pip Run command:

```
pip install -r requirements.txt on project
```

After that you have to create two ENV_VARs on your desktop

```
key: ACCESS_S3_MONGO
value: /path/to/this/file/acessoS3mongo.json

key: REMOVE_BACKUP_MONGO_DATABASE
value: /path/to/this/file/config-prod.json
```


## How to Test
Once all dependencies are satisfied you can run tests:

Run command:

```
pytest --pyargs .\tests -v --junitxml=results.xml --cov-fail-under 86 --cov-report xml --cov-report html --cov .\removebackupmongodatabase\
```

## How to implement
Use ssh connection to enter on mongo03 server and configure the ENV_VARs ***ACCESS_S3_MONGO*** and ***REMOVE_BACKUP_MONGO_DATABASE*** with the value bellow

```
export ACCESS_S3_MONGO=/zap/scripts/dump/remove_dump_files/acessoS3mongo.json

export REMOVE_BACKUP_MONGO_DATABASE=/zap/scripts/dump/remove_dump_files/config-prod.json
```

After that you have to transfer the project files to the server, you can do that by using the command ***pscp***, follow bellow the example

```
pscp -i C:\path\my-key-pair.ppk C:\path\Sample_file.txt ec2-user@public_dns:/home/ec2-user/Sample_file.txt
```
