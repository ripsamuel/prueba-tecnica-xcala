## Prueba Técnica - Desarrollador Web
# Objetivo:
Crear una aplicación que procese pedidos desde una API, realice varias
validaciones en el servidor y luego presente los pedidos en el cliente de forma paginada.
Crea un nuevo proyecto de react utilizando Create React App (CRA) o Vite.js.
# PARTE 1
-Crea una función que haga un query a la colección “orders” la cual proporciona
pedidos ficticios.

-En esta función, para cada pedido, realiza las siguientes operaciones:
Calcula y valida que la suma de los precios de los artículos coincida con el
precio total del pedido.

-Verifica que todos los artículos tengan IDs de productos válidos
(consideramos inválido si el valor es null, undefined, una cadena vacía "", 0,
negativo, etc.).

-Verifica que todos los artículos tengan SKUs válidos (mismo criterio de
validación que los IDs de productos).

-Realiza un segundo query a la colección “products” y usando el campo
“item_product_sku” para obtener el “sku_img_src”

-Una vez que las validaciones estén completas, guarda en Firestore el pedido con los
datos originales + los datos calculados anteriormente + un timestamp del momento
en que se realizó la verificación.

# PARTE 2 REMIX
-Consultar la colección que contiene los pedidos procesados en la parte 1:“verified_orders”

-La página de inicio “/verifiedOrders” debe presentar 5 pedidos por defecto, y cargar 5
más cada vez que se llegue al final de la página utilizando un scroll infinito. Los
pedidos deben organizarse utilizando un campo de timestamp del momento en que
se verificó, mostrando primero los más recientes.

-En la misma página de inicio “/verifiedOrders”, realiza un filtro de búsqueda para
mostrar pedidos a partir de su ID.

-Al hacer clic en cada "tarjeta" del pedido, se debe renderizar un componente en la
ruta /verifiedOrders/{{order_number}}.

Este componente debe presentar las
validaciones de cada pedido
- y las imágenes de los SKU asociados a ese pedido.

-Dentro de cada página de pedido, debe haber una serie de botones
correspondientes a los estados del pedido: "En Proceso", "Despachado",
"Entregado". Al hacer clic en estos botones, se debe actualizar el estado del pedido
en Firestore. Los botones "Despachado" y "Entregado" sólo deben estar disponibles
si los estados anteriores ya se han seleccionado.


Entrega
Tienes 4 hr a partir de la recepción de la prueba para enviar un link de github con los
resultados.
Por favor, el código junto con las instrucciones para desplegar y probar la aplicación. Buena
suerte y por favor no dudes en hacer preguntas si alguna parte de la prueba no está clara.

Credenciales proyecto Firebase:
const firebaseConfig = {
apiKey: "AIzaSyBkgRhPXH0dngYY6y4lrEFjbjYCDQDYcfE",
authDomain: "fakexinside-b8ad6.firebaseapp.com",
projectId: "fakexinside-b8ad6",
storageBucket: "fakexinside-b8ad6.appspot.com",
messagingSenderId: "443928555879",
appId: "1:443928555879:web:f5b88fd93b45efc362bfc2"
};

Nombres de colecciones:
Colección pedidos: “orders”
Colección productos: “products”







button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;



  ripsamuel_verified_orders