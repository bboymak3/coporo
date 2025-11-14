# Coporo frontend

Proyecto React minimal creado para integrar el componente "Crear tu web".

Cómo usar (en tu máquina local)

1. Sitúate en la carpeta `frontend`:

```pwsh
Set-Location -LiteralPath 'E:\Documents\grado33\frontend'
```

2. Instala dependencias:

```pwsh
npm install
```

3. Añade un archivo `.env.local` en `frontend/` con las variables de Supabase (no subir a git):

```
REACT_APP_SUPABASE_URL=https://TU-PROYECTO.supabase.co
REACT_APP_SUPABASE_KEY=TU-CLAVE-PUBLICA
```

4. Inicia la app:

```pwsh
npm start
```

Notas:
- En este entorno no estaba disponible `npx create-react-app`, por eso se generó un scaffold minimal.
- La tabla `landings` debe existir en tu proyecto Supabase y las credenciales deben permitir inserciones.
- Mejoras sugeridas: manejo de upload de imágenes (Supabase Storage), validaciones más estrictas y tests.
