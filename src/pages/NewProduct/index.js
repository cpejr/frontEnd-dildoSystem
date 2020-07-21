import React from 'react'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import AdminDashBoard from '../../components/AdminDashboard/index.js'
import PublishIcon from '@material-ui/icons/Publish';

import './styles.css'


const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

export default function NewProduct() {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    function handleSubmit() {
        return (
            console.log("OI")
        );
    }

    return (

        <div>
            <AdminDashBoard />

            <div className="tudo">

                <div className="product-title-page">
                    <h3>Novo Produto</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        <div className="left-form">
                            <div className="general-form">
                                <p>Geral</p>
                                <label htmlFor="name">Nome do produto</label>
                                <input className="product-name" type="text" />
                                <label htmlFor="description">Descrição</label>
                                <textarea className="description" type="text" />
                            </div>
                            <p>Preço</p>
                            <div className="price-form">

                                <div className="left-side">
                                    <label htmlFor="client">Cliente</label>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend3">R$</span>
                                            </div>
                                            <input type="text" class="form-control" id="validationDefaultUsername1" placeholder="00.00" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                    </div>
                                    <label htmlFor="promotional-price-r">Preço Promocional (opcional)</label>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2">R$</span>
                                            </div>
                                            <input type="text" class="form-control" id="validationDefaultUsername" placeholder="00.00" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <label htmlFor="wholesale">Atacado</label>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend3">R$</span>
                                            </div>
                                            <input type="text" class="form-control" id="validationDefaultUsername1" placeholder="00.00" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                    </div>
                                    <label htmlFor="promotional-price-l">Preço Promocional (opcional)</label>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2">R$</span>
                                            </div>
                                            <input type="text" class="form-control" id="validationDefaultUsername" placeholder="00.00" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="images-form">
                                <p>Imagens</p>
                                <label htmlFor="main">Principal</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupFileAddon01">
                                            <PublishIcon style={{ fontSize: 17 }} />
                                        </span>
                                    </div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                        <label class="custom-file-label" for="inputGroupFile01">Selecione o arquivo</label>
                                    </div>
                                </div>

                                <label htmlFor="secondary">Secudárias</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroupFileAddon01">
                                            <PublishIcon style={{ fontSize: 17 }} />
                                        </span>
                                    </div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                        <label class="custom-file-label" for="inputGroupFile01">Selecione o arquivo</label>
                                    </div>
                                </div>
                                <span>Formatos aceitos: JPG, PNG</span>
                            </div>
                        </div>
                        <div className="right-form-dois">
                            <div className="right-form">
                                <div className="config-form">
                                    <p>Configuração</p>
                                    {/*SWITCHS...*/}
                                    <FormControlLabel
                                        control={<IOSSwitch 
                                            checked={state.checkedA} 
                                            onChange={handleChange} 
                                            name="checkedA" />}
                                        label="Visível para compradores"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch 
                                            checked={state.checkedB} 
                                            onChange={handleChange} 
                                            name="checkedB" />}
                                        label="Em promoção (clientes)"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch 
                                            checked={state.checkedC} 
                                            onChange={handleChange} 
                                            name="checkedC" />}
                                        label="Em promoção (Atacadista)"
                                    />
                                    <FormControlLabel
                                        control={<IOSSwitch 
                                            checked={state.checkedD} 
                                            onChange={handleChange} 
                                            name="checkedD" />}
                                        label="Em destaque"
                                    />
                                </div>
                                <div className="stock-form">
                                    <p>Estoque</p>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2">Unidades</span>
                                            </div>
                                            <input type="text"
                                                class="form-control"
                                                id="validationDefaultUsername"
                                                placeholder="0"
                                                aria-describedby="inputGroupPrepend2"
                                                required />
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupPrepend2">Peso</span>
                                            </div>
                                            <input type="text"
                                                class="form-control"
                                                id="validationDefaultUsername"
                                                placeholder="00.00"
                                                aria-describedby="inputGroupPrepend2"
                                                required />
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="inputGroupPrepend2">g</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="category-form">
                                    <p>Categorias</p>
                                    <label htmlFor="main-category">Principal:   </label>
                                    {/*DROPDOWNS*/}
                                    <select name="cars" id="cars">
                                        <option value="selecionar">Selecionar</option>
                                        <option value="Cosméticos">Cosméticos</option>
                                        <option value="Acessórios">Acessórios</option>
                                        <option value="Brincadeiras">Brincadeiras</option>
                                        <option value="Próteses">Próteses</option>
                                    </select>
                                    <label htmlFor="subcategory">Subcategoria:</label>
                                    <select name="cars" id="cars">
                                        <option value="selecionar">Selecionar</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                    <label htmlFor="brand">Marca:</label>
                                    <select name="cars" id="cars">
                                        <option value="selecionar">Selecionar</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>

                                </div>


                                <div className="product-button">
                                    <button type="submit">
                                        CRIAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>



            </div>

        </div>
    )
}