'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [selectCategory, setSelectCategory] = useState('');
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
  }

  async function deleteCategory(category) {
    console.log(category._id);
    await axios.delete('/api/categories/' + category._id).then((response) => {
      fetchCategories();
    });

    setSelectCategory(null);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    const data = {
      name,
      parentCategory,
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
      setParentCategory('');
    } else {
      await axios.post('/api/categories', data);
    }

    setName('');
    fetchCategories();
  }

  return (
    <div>
      <h1>Categories</h1>

      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : 'Create new category'}
      </label>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />

          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.name} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(item)}
                    className="btn-default mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(item)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
