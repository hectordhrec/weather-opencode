# Revisión Weather CLI

- [x] **Estructura de archivos:** Modular en src, separar types, storage, geocoding, forecast y menu en archivos propios bajo src/
- [x] **Colores:** no hay ninguno; falta definir cyan (menú), amarillo (temp), verde/rojo (ok/error).
- [x] **Ciudades:** geocoding solo trae 1 resultado; nombres ambiguos pueden fallar.
- [ ] **Carga:** ¿hay estado de carga en las tareas asíncronas?
- [ ] **7 day forecast:** agregar la posibilidad de obtener el pronostico del clima para los próximos 7 días
- [ ] **Escalabilidad:** ¿qué tan fácil será expandir con nuevas funcionalidades?
- [ ] **Binario:** compila bien; revisar que `./weather` guarde datos en `~/.config/weather-cli/`.
- [ ] **Tests:** no existen; conviene al menos probar storage y las APIs con mocks.
- [ ] **AGENTS.md:** dice que `index.ts` es stub, pero la app ya funciona — hay que actualizarlo.
