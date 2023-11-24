import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByFilter } from "../functions/product";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import searchQuery from "../redux/actions/searchQuery";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Star from "../components/forms/Star";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState("")
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");  //single sub
  const [subIds, setSubIds] = useState([]);
  const [brands, setBrands] = useState(["Amol", "Vdilal", "Havmore", "Amul"]);
  const [brand, setBrand] = useState("")
  const [shippings, setShippings] = useState(["Yes", "No"])
  const [shipping, setShipping] = useState('')
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { text } = search;
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState('female');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    loadAllProducts()
    // fetch categories
    getCategories()
      .then((res) => {
        setCategories(res.data)
        //console.log("categories---",res.data)
      })
    // fetch subcategories
    getSubs()
      .then((res) => {
        setSubs(res.data)
        //console.log("subss... res",res.data)
      })
      .catch((err) => {
        console.log("fetch sub category", err)
      });
  }, [])

  // 1. load products by default on page load
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then((res) => {
      setProducts(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log("shope load all product err", err)
    })
  }

  // 2. load products on user search input
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg)
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => console.log("filter err", err))
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) { loadAllProducts() }
    }, 300)
    return () => clearTimeout(timer)
  }, [text])

  // 3. load products based on price range
  useEffect(() => {
    fetchProducts({ price })
  }, [ok])

  const handleSlider = (event, newValue) => {
    dispatch(searchQuery({ text: "" }))
    // reset
    setCategoryIds([]);
    setStar("");
    setSubIds("");
    setPrice(newValue)
    setTimeout(() => {
      setOk(!ok)
    }, 300);
  }

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategoris = () => <>{categories.map((c) => <div key={c._id}>
    <FormControlLabel control={<Checkbox value={c._id}
      name="category"
      className="pb-2 pl-4 pr-4"
      checked={categoryIds.includes(c._id)}
      onChange={handleCheck} />} label={c.name} />
  </div>)}</>
  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch(searchQuery({ text: "" }))
    setPrice([0, 0]);
    setSubIds("");
    setStar("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    console.log(inTheState);
    fetchProducts({ category: inTheState });
  }

  // 5. show products by star rating
  const handleStarClick = (num) => {
    dispatch(searchQuery({ text: "" }))
    setPrice([0, 0]);
    setSubIds("");
    setCategoryIds([]);
    setStar(num);
    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () => <>
    {subs.map((s) =>
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge bg-primary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>)}
  </>;

  const handleSub = (sub) => {
    console.log("SUB", sub);
    setSub(sub);
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    dispatch(searchQuery({ text: "" }))
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("")
    fetchProducts({ sub });
  };

  //Brands
  const handleBrand = (e) => {
    dispatch(searchQuery({ text: "" }))
    setValue(e.target.value);
    setPrice([0, 0]);
    setSubIds("");
    setCategoryIds([]);
    setStar("");
    setBrand(e)
    fetchProducts({ brand: e.target.value });
  }
  const showBrands = () => <>
    {brands.map((b) => <div key={b}>
      <FormControlLabel value={b} control={<Radio />} label={b} />
    </div>)}
  </>

  const handleCheckShipping = (e) => {
    dispatch(searchQuery({ text: "" }))
    setValue(e.target.value);
    setPrice([0, 0]);
    setSubIds("");
    setCategoryIds([]);
    setStar("");
    setBrand('');
    setShipping(e)
    fetchProducts({ shipping: e.target.value });
  }
  const showShipping = () => <>
    {shippings.map((s) => <div key={s}>
      <FormControlLabel value={s} control={<Radio />} label={s} />
    </div>)}
  </>

  return (
    <div className="btn-group mt-5 pt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/Filter</h4>
            <hr />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  ₹ Price
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  <Slider
                    value={price} // Pass the external value prop here
                    onChange={(event, newValue) => handleSlider(event, newValue)}
                    valueLabelDisplay="auto"
                    max={200}
                    step={1}
                    getAriaValueText={(value) => `Rs ${value}`}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  Categories
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  <FormGroup>
                    {showCategoris()}
                  </FormGroup>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  Star
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  {showStars()}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  Subs
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  {showSubs()}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  Brands
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={value}
                      onChange={handleBrand}
                      name="radio-buttons-group"
                    >
                      {showBrands()}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* shipping */}
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7bh-content"
                id="panel7bh-header"
              >
                <Typography sx={{ width: '100%', flexShrink: 0 }}>
                  Shipping
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box >
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={value}
                      onChange={handleCheckShipping}
                      name="radio-buttons-group"
                    >
                      {showShipping()}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-danger">Products</h4>
            )}
            {products.length < 1 && <p>No products found</p>}
            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-sm-12 col-md-12 col-lg-4 mb-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Shop