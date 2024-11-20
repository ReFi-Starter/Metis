import React, { useState } from "react";
import "./LandingPage.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import {
  TokenCreator_Contract_ABI,
  TokenCreator_Contract_Address,
} from "../../utilies/constant";
import toast from "react-hot-toast";

function FeeBoxes({
  setBuyBack,
  setLiquidityFee,
  setBurningFee,
  buyBack,
  burningFee,
  liquidityFee,
}) {
  // State for each fee

  // Handler functions for increment and decrement
  const increment = (setter, value) => {
    if (value < 20) {
      setter(value + 1);
    }
  };

  const decrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  return (
    <div className="row">
      <div className="col-6 col-md-4">
        <div className="fee_boxs">
          <p className="text-white text-center">Marketing Fee</p>
          <div className="d-flex">
            <button
              className="decr_btn"
              onClick={() => decrement(setBuyBack, buyBack)}
            >
              -
            </button>
            <div className="percent w-100">{buyBack}%</div>
            <button
              className="incr_btn"
              onClick={() => increment(setBuyBack, buyBack)}
            >
              +
            </button>
          </div>
          <span className="req_text">
            Sends token to your chosen marketing wallet (max 20%)
          </span>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <div className="fee_boxs">
          <p className="text-white text-center">DEV Fee</p>
          <div className="d-flex">
            <button
              className="decr_btn"
              onClick={() => decrement(setLiquidityFee, liquidityFee)}
            >
              -
            </button>
            <div className="percent w-100">{liquidityFee}%</div>
            <button
              className="incr_btn"
              onClick={() => increment(setLiquidityFee, liquidityFee)}
            >
              +
            </button>
          </div>
          <span className="req_text">
          Sends token to your chosen DEV wallet (max 20%)
          </span>
        </div>
      </div>
      <div className="col-6 col-md-4">
        <div className="fee_boxs">
          <p className="text-white text-center">Liquidity Fee</p>
          <div className="d-flex">
            <button
              className="decr_btn"
              onClick={() => decrement(setBurningFee, burningFee)}
            >
              -
            </button>
            <div className="percent w-100">{burningFee}%</div>
            <button
              className="incr_btn"
              onClick={() => increment(setBurningFee, burningFee)}
            >
              +
            </button>
          </div>
          <span className="req_text">
            These fees are triggered whenever swap threshold reached(Increase the pool size, fees altogether can't exceed 20%)
          </span>
        </div>
      </div>
    </div>
  );
}

const options = [
  { id: "coral", label: "Coral Restoration" },
  { id: "protect", label: "Protect the Bees" },
  { id: "dogs", label: "Dogs & Cats" },
  { id: "beach", label: "Beach Cleanups" },
  { id: "mangrove", label: "Seed Mangrove" },
  { id: "water", label: "Clean Water" },
];

export default function LandingPage() {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [getValues, setgetValues] = useState({
    name: "",
    symbol: "",
    totalsupply: "",
    blockchain: "",
    impact: "",
  });

  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [spinner, setspinner] = useState(false);
  const [buyBack, setBuyBack] = useState(0);
  const [liquidityFee, setLiquidityFee] = useState(0);
  const [burningFee, setBurningFee] = useState(0);
  const [hash, sethash] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (getValues[name] === value) return; // Avoid unnecessary re-renders
    setgetValues({ ...getValues, [name]: value });
  };
  const isFormValid = Object.values(getValues).every(
    (value) => value.trim() !== ""
  );

  //   console.log("isFormValid",getValues)

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  const getStepClass = (step) => {
    return selectedStep === step ? "cir selected" : "cir";
  };

  const getTextClass = (step) => {
    return selectedStep === step
      ? "text-white fw-bold selected-text"
      : "text-dark fw-bold";
  };

  const createToken = async () => {
    try {
      if (!address) {
        toast.error("Please Connect Metamaske First!");
      } else {
        if (isFormValid == false) {
          toast.error("Fill all the fields");
          return;
        }
        setspinner(true);
        const { name, symbol, exchangeaddress, totalsupply } = getValues;

        // let preSaleValue = webSupply.utils.toWei(getBNB_value.toString());
        const { request } = await prepareWriteContract({
          address: TokenCreator_Contract_Address,
          abi: TokenCreator_Contract_ABI,
          functionName: "CreateNewtoken",
          args: [
            name,
            symbol,
            exchangeaddress,
            totalsupply,
            buyBack*10,
            burningFee*10,
            liquidityFee*10,
          ],
          account: address,
        });
        const { hash } = await writeContract(request);
        const data = await waitForTransaction({
          hash,
        });
        sethash(hash);
        setspinner(false);
        toast.success("Token Create Successful");
        setSelectedStep(3)
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };

  return (
    <div className="LandingPage">
      <div className="container">
        <div className="line_upper">
          <div className="row tkn_line">
            <div className="col-4">
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                onClick={() => handleStepClick(1)}
              >
                <div className={getStepClass(1)}>
                  <span className="fs-6 fw-bold">1</span>
                </div>
                <p className={getTextClass(1) + " mb-0 mt-2"}>TOKEN INFO</p>
              </div>
            </div>
            <div className="col-4">
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                onClick={() => handleStepClick(2)}
              >
                <div className={getStepClass(2)}>
                  <span className="fs-6 fw-bold">2</span>
                </div>
                <p className={getTextClass(2) + " mb-0 mt-2"}>VERIFY&CREATE</p>
              </div>
            </div>
            <div className="col-4">
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                onClick={() => handleStepClick(3)}
              >
                <div className={getStepClass(3)}>
                  <span className="fs-6 fw-bold">3</span>
                </div>
                <p className={getTextClass(3) + " mb-0 mt-2"}>DONE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conditionally render sections based on the selected step */}
        {selectedStep === 1 && (
          <div className="row" style={{ marginTop: "5rem" }}>
            {/* Landing Cards */}
            <div className="col-md-6">
              <div className="landing_card">
                <div className="card_head d-flex align-items-center gap-1">
                  <span className="text-white fs-6 fw-semibold">1.</span>
                  <h1 className="text-white fs-2 fw-bold">TOKEN INFO</h1>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-md-3">
                    <p className="text-white mb-0">Name*</p>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      placeholder="Creazy Bees"
                      name="name"
                      onChange={handleChange}
                      id=""
                      className="info_iput"
                      value={getValues?.name}
                    />
                    <span className="req_text">
                      Required.Write the name of your token(between 1 to 32
                      words)
                    </span>
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-md-3">
                    <p className="text-white mb-0">Symbol*</p>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      placeholder="$CBEE"
                      name="symbol"
                      onChange={handleChange}
                      className="info_iput"
                      value={getValues?.symbol}
                    />
                    <span className="req_text">
                      Required.Write the symbol of your token(between 1 to 32
                      words)
                    </span>
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-md-3">
                    <p className="text-white mb-0">Blockchain*</p>
                  </div>
                  <div className="col-md-9">
                    <Form.Select
                      aria-lael="Default select example"
                      size="lg"
                      className="info_iput"
                      style={{ border: " 1px solid #3F4854", color: "#fff" }}
                      name="blockchain"
                      placeholder="Select Chain"
                      onChange={handleChange}
                      value={getValues?.blockchain}
                    >
                      <option>Select Chain </option>
                      <option value="bscTestnet">Metis Mainnet</option>
                    </Form.Select>

                    <span className="req_text">
                      Required.choose the blockchain you want to create your
                      token
                    </span>
                  </div>
                </div>
                <div className="row mt-4 align-items-center">
                  <div className="col-md-3">
                    <p className="text-white mb-0">Total Supply*</p>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      placeholder="420,000,000,000"
                      className="info_iput"
                      name="totalsupply"
                      onChange={handleChange}
                      value={getValues?.totalsupply}
                    />
                    <span className="req_text">
                      Required.choose the amount of tokens you want to
                      create(1000 and 10^18){" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <div className="landing_card">
                <div className="card_head d-flex align-items-center gap-1">
                  <span className="text-white fs-6 fw-semibold">2.</span>
                  <h1 className="text-white fs-2 fw-bold">CHOOSE IMPACT</h1>
                </div>
                <div className="row">
                  {options.map(({ id, label }) => (
                    <div key={id} className="col-6 col-md-4 mt-2">
                      <div className="impact_boxs d-flex flex-column align-items-center">
                        <label
                          htmlFor={id}
                          className="mb-0 text-white impact_label"
                        >
                          {label}
                        </label>
                        <input
                          id={id}
                          name="impact"
                          type="radio"
                          value={id || getValues?.impact}
                          checked={getValues?.impact === id}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* <h3 className="Burn">BURN</h3>
                <p className="text-white text-center mt-3">
                  {" "}
                  A simple token (name, symbol, decimals, and supply) with the
                  addition of a function that allows token burning.
                </p> */}
                {!isFormValid && (
                  <p style={{ color: "red", fontSize: "18px" }}>
                    Fill all the fields
                  </p>
                )}

                <div className="btn-main">
                  <button
                    onClick={() =>
                      address
                        ? chain?.id == chains[0]?.id
                          ? handleStepClick(2)
                          : switchNetwork?.(chains[0]?.id)
                        : open()
                    }
                    className="btn-style"
                    style={{
                      opacity: address ? !isFormValid && "0.5" : "",
                      cursor: address
                        ? !isFormValid
                          ? "no-drop"
                          : "pointer"
                        : "",
                    }}
                    disabled={address ? !isFormValid : false}
                  >
                    {address ? (
                      chain?.id == chains[0]?.id ? (
                        address ? (
                          <>Next</>
                        ) : (
                          <>Connect Wallet</>
                        )
                      ) : (
                        "Switch NetWork"
                      )
                    ) : (
                      <>Connect Wallet</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedStep === 2 && (
          <div
            className="row justify-content-center"
            style={{ marginTop: "5rem" }}
          >
            <div className="col-md-10">
              <div className="landing_card" style={{ height: "auto" }}>
                <div className="card_head d-flex align-items-center gap-1">
                  <span className="text-white fs-6 fw-semibold">3.</span>
                  <h1 className="text-white fs-2 fw-bold">OPTIONS</h1>
                </div>
                <p className="text-white fw-bold text-start mt-3">GENERAL </p>
                <div>
                  <p className="text-white mb-2">Exchange*</p>
                  <input
                    type="text"
                    placeholder="Creazy Bees"
                    name="exchange"
                    onChange={handleChange}
                    id=""
                    className="info_iput"
                    value={"METIS L2"}
                    disabled
                  />

                  <span className="req_text">
                    Required.Choose the exchange where you will add liquidity
                    for your trading pair
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-white mb-2">Tax Wallet</p>
                  {/* <div className="info_iput chng_bor"> */}
                  <input
                    type="text"
                    placeholder="0xc858A329Bf053BE78D6239C4A4343B8FbD2147tr"
                    name="exchangeaddress"
                    onChange={handleChange}
                    id=""
                    className="info_iput"
                    value={getValues?.exchangeaddress}
                  />
                  {/* <p className="text-white mb-0 text-truncate">
                      0xc858A329Bf053BE78D6239C4A4343B8FbD2147tr
                    </p> */}
                  {/* </div> */}
                  <span className="req_text">
                    Required:{" "}
                    <span style={{ color: "#AB6E75" }}>
                      The wallet address that will receive marketing, liquidity , dev fees (must
                      confirm to a valid ERC20 token address)
                    </span>
                    . It can be the same as contract deployer address
                    and can't be zero (0x000...) address.
                  </span>
                </div>
                {/* <div className="mt-3">
                  <p className="text-white mb-2">Reward Token*</p>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="info_iput drop_menu fw-bold text-start"
                      id="dropdown-basic"
                    >
                      This Token
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">DEXTOOL</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">USDT</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">ETH</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <span className="req_text">
                    Choose the token in which your marketing taxes will be paid
                  </span>
                </div> */}
                <p className="text-white fw-bold mt-3 text-start">FEE</p>
                <p className="req_text">The sum of all fees can't exceed 20%</p>
                <FeeBoxes
                  setBuyBack={setBuyBack}
                  setLiquidityFee={setLiquidityFee}
                  setBurningFee={setBurningFee}
                  buyBack={buyBack}
                  burningFee={burningFee}
                  liquidityFee={liquidityFee}
                />
                {/* <p className="text-white fw-bold mt-3 text-start">BLACKLIST</p> */}
                {/* <div className="d-flex align-items-center gap-3">
                  <p className="text-white mb-0 fw-semi-bold fs-5">
                    Enable antibot
                  </p>
                  <div>
                    <div className="toggle-container" onClick={handleToggle}>
                      <div
                        className={`toggle-switch ${
                          isToggled ? "toggled" : ""
                        }`}
                      ></div>
                    </div>
                    <span className="req_text">
                      Allows to blacklist up to 10 addresses during <br /> the
                      first 48 hours after the token contract deployment
                    </span>
                  </div>
                </div> */}
                <div></div>
                <div className="second-btn">
                  <button
                    onClick={() => handleStepClick(1)}
                    style={{ width: "10%" }}
                    className="btn-style"
                  >
                    Back
                  </button>
                  <button
                    onClick={() =>
                      address
                        ? chain?.id == chains[0]?.id
                          ? createToken()
                          : switchNetwork?.(chains[0]?.id)
                        : open()
                    }
                    style={{
                      width: "20%",
                      opacity: address
                        ? getValues?.exchangeaddress == undefined && "0.5"
                        : "",
                      cursor: address
                        ? getValues?.exchangeaddress == undefined
                          ? "no-drop"
                          : "pointer"
                        : "",
                    }}
                    className="btn-style"
                    disabled={
                      address ? getValues?.exchangeaddress == undefined : ""
                    }
                  >
                    {spinner ? "Loading..." : "Create Token"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedStep === 3 && (
          <div
            className="row justify-content-center"
            style={{ marginTop: "5rem" }}
          >
            <div className="col-md-10">
              <div className="landing_card" style={{ height: "auto" }}>
                <div className="card_head d-flex align-items-center gap-1">
                  <span className="text-white fs-6 fw-semibold">4.</span>
                  <h1 className="text-white fs-2 fw-bold">Your token is minted and transfered to your wallet. See Transaction Hash to get the token Address</h1>
                </div>

                <div className="mt-3">
                  {hash ? (
                    <a
                      href={`https://metisscan.info/tx/${hash}`}
                      target="_blank"
                    >{`https://metisscan.info/tx/${hash}`}</a>
                  ) : (
                    <p className="text-white mt-2">No Hash ...</p>
                  )}
                </div>

                <div className="second-btn">
                  <button
                    onClick={() => {
                      setSelectedStep(1);
                      setgetValues({
                        name: "",
                        symbol: "",
                        totalsupply: "",
                        blockchain: "",
                        impact: "",
                      });
                    }}
                    style={{
                      width: "20%",
                      opacity: address
                        ? getValues?.exchangeaddress == undefined && "0.5"
                        : "",
                      cursor: address
                        ? getValues?.exchangeaddress == undefined
                          ? "no-drop"
                          : "pointer"
                        : "",
                    }}
                    className="btn-style"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
