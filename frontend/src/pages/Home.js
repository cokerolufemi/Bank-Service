import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBankModal from "../components/AddBankModel";
import {
    AiOutlineSearch,
    AiOutlinePlus,
    AiFillDelete,
    AiFillEdit,
  } from "react-icons/ai";

function Home() {
    const [banks, setBanks] = useState([]);
    const [search, setSearch] = useState("");
    const [isModal, setIsModal] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
  
    const getBanks = async () => {
      const user = localStorage.getItem("user");
      try {
        const { data } = await axios.get("http://localhost:4000/bank/", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        console.log(data)
        setBanks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const deleteBank = async (id, e) => {
        e.preventDefault()
      const user = localStorage.getItem("user");
      try {
        await axios.delete(`http://localhost:4000/bank/${id}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        setBanks(banks.filter((bank) => bank._id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const searchBank = async () => {
      const user = localStorage.getItem("user");
      try {
        const { data } = await axios.get(
          `http://localhost:4000/bank/:id?/${search}`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setBanks(data.bank);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (!search) getBanks();
    }, [search]);
  
    const editBank = (bank) => {
      setSelectedBank(bank);
      setIsEditting(true);
      setIsModal(true);
    };
  
    if (search && banks.length === 0) {
      return <h1>results not found {search}</h1>;
    }
  
    return (
      <div className="main-container">
        <div className="main">
        <div className="addBank">
          <button className="addBankBtn" onClick={() => setIsModal(true)}>
            <AiOutlinePlus /> Add a bank
          </button>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th className="name">Bank Name</th>
              <th className="branch">Bank Branch</th>
              <th className="location">Bank location</th>
              <th className="address">Bank address</th>
              <th className="accountnumber">Account number</th>
              <th className="phone">phone</th>
            </tr>
          </thead>
          <tbody>
            {banks?.map((bank) => {
              return (
                <tr key={bank._id} className="data">
                  <td className=" value name">{bank.name}</td>
                  <td className=" value branch">{bank.branch}</td>
                  <td className=" value location">{bank.location}</td>
                  <td className=" value address">{bank.address}</td>
                  <td className=" value accountnumber">{bank.accountNumber}</td>
                  <td className=" value phone">{bank.phone}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => deleteBank(bank._id)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                    <AiFillEdit
                      onClick={() => editBank(bank)}
                      style={{ cursor: "pointer", width: "1.5rem" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {isModal && (
          <AddBankModal
            setIsModal={setIsModal}
            getBanks={getBanks}
            isEditting={isEditting}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
          />
        )}
      </div>
    );
  }
  
  export default Home;