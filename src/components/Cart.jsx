import data from "../assets/data";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/redux";

function Cart() {
  const menu = useSelector((state) => state.menu);
  const cart = useSelector((state) => state.cart);

  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보가 없어요!
      </div>
    );

  const allMenus = [...menu.커피, ...menu.논커피];

  return (
    <>
      <h2>장바구니</h2>
      <ul className="cart">
        {cart?.length ? (
          cart.map((el) => (
            <CartItem
              key={el.id}
              el={el}
              item={allMenus.find((m) => m.name === el.name)}
            />
          ))
        ) : (
          <div className="no-item">장바구니에 담긴 상품이 없어요!</div>
        )}
      </ul>
    </>
  );
}

function CartItem({ item, el }) {
  const dispatch = useDispatch();
  const { options, quantity, id } = el;

  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <img height={100} src={item.img} alt={item.name} />
        <div>{item.name}</div>
      </div>
      <div className="cart-item-option">
        {Object.keys(options).map((key) => (
          <div key={key}>
            {key} : {data.options[key][options[key]]}
          </div>
        ))}
        <div>개수 : {quantity}</div>
      </div>
      <button
        className="cart-item-delete"
        onClick={() => {
          dispatch(removeFromCart(id));
        }}
      >
        삭제
      </button>
    </li>
  );
}

export default Cart;
