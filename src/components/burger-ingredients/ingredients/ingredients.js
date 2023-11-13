import ingredientsStyles from "../ingredients/ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from 'prop-types';
import { orderListItemPropTypes } from "../../../utils/prop-types";

const Ingredients = ({ type, ingredients, id, onOpen }) => {
  
  return (
    <section id={id}>
      <h3 className="text text_type_main-medium">{type}</h3>
      <ul className={ingredientsStyles.list}>
        {ingredients.map((item) => (
          <IngredientItem ingredient={item} key={item._id} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  );
};
Ingredients.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredient: PropTypes.arrayOf(orderListItemPropTypes),
  onOpen: PropTypes.func.isRequired
}
export default Ingredients;