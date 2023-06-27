## Prueba Técnica - Desarrollador Web
# Objetivo:
Crear una aplicación que procese pedidos desde una API, realice varias
validaciones en el servidor y luego presente los pedidos en el cliente de forma paginada.
Crea un nuevo proyecto de react utilizando Create React App (CRA) o Vite.js.
# PARTE 1
Crea una función que haga un query a la colección “orders” la cual proporciona
pedidos ficticios.

En esta función, para cada pedido, realiza las siguientes operaciones:
Calcula y valida que la suma de los precios de los artículos coincida con el
precio total del pedido.

Verifica que todos los artículos tengan IDs de productos válidos
(consideramos inválido si el valor es null, undefined, una cadena vacía "", 0,
negativo, etc.).

Verifica que todos los artículos tengan SKUs válidos (mismo criterio de
validación que los IDs de productos).

Realiza un segundo query a la colección “products” y usando el campo
“item_product_sku” para obtener el “sku_img_src”
Una vez que las validaciones estén completas, guarda en Firestore el pedido con los
datos originales + los datos calculados anteriormente + un timestamp del momento
en que se realizó la verificación.

# PARTE 2
El cliente debe consultar la colección que contiene los pedidos procesados en la
parte 1.
La página de inicio “/orders” debe presentar 5 pedidos y cargar de a 5 usando un
scroll infinito. Los pedidos deben organizarse utilizando un campo de timestamp del
momento en que se verificó, mostrando primero los más recientes. En caso que el
pedido contenga 1 o más validaciones negativas, debe presentar el contenedor del
pedido con un background diferente a los pedidos sin validaciones negativas.
Incluye un botón para cambiar el orden de visualización de los pedidos de más
reciente a más antiguo, y viceversa.
Al hacer clic en cada "tarjeta" del pedido, se debe renderizar un componente en la
ruta /orders/{{order_number}}. Este componente debe presentar las validaciones de
cada pedido y las imágenes de los SKU asociados a ese pedido.
Dentro de cada página de pedido, debe haber un botón "Despachado". Al hacer clic
en este botón, se debe registrar para ese pedido un nuevo campo "order_state":
"Despachado" en Firestore.
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
