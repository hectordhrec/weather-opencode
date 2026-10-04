# Revisión Weather CLI

- [x] **Estructura de archivos:** Modular en src, separar types, storage, geocoding, forecast y menu en archivos propios bajo src/
- [x] **Colores:** no hay ninguno; falta definir cyan (menú), amarillo (temp), verde/rojo (ok/error).
- [x] **Ciudades:** geocoding solo trae 1 resultado; nombres ambiguos pueden fallar.
- [x] **Carga:** ¿hay estado de carga en las tareas asíncronas?
- [x] **Todas las ciudades:** Al listar o borrar todas las ciudades mostrar el admin1 y country para identificar tal como se realiza al buscar una ciudad
- [x] **7 day forecast:** agregar la posibilidad de obtener el pronostico del clima para los próximos 7 días
- [ ] **Escalabilidad:** ¿qué tan fácil será expandir con nuevas funcionalidades?
- [ ] **Binario:** compila bien; revisar que `./weather` guarde datos en `~/.config/weather-cli/`.
- [ ] **Tests:** no existen; conviene al menos probar storage y las APIs con mocks.
- [x] **AGENTS.md:** ya no dice que `index.ts` es un stub; se actualizó con `spinner.ts`, `weather-codes.ts` y el endpoint `daily`.
- [ ] **Prompt:** `src/presentation/input.ts` crea y cierra una interfaz readline nueva por cada `prompt()`, así que con stdin no-TTY (pipes, tests) se pierde el resto del buffer de entrada. Afecta a `actions/settings.ts` y a cualquier flujo de varias preguntas.
