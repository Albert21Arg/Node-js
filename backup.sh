source env.sh

# Nombre del backup
FECHA=$(date +"%Y-%m-%d_%H-%M")
NOMBRE_BACKUP="backup_Conexion-Educativa_$FECHA"

# Ruta donde se guardará el backup
RUTA_BACKUP="/c/Users/alber/Documents/backups_mongodb/$NOMBRE_BACKUP"

# Usar la URI desde el archivo .env
URI="mongodb+srv://alberttaborda9:mQ-9GU9JrbHWNn3@adso2846461.otoee.mongodb.net/tienda"

mkdir -p "$RUTA_BACKUP"

# Comando para crear el backup
mongodump --uri="$URI" --out="$RUTA_BACKUP"

# Mensaje de éxito
echo "Backup realizado exitosamente en: $RUTA_BACKUP"
