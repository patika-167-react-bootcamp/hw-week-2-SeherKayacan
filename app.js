
  
    const sendernames=document.getElementById("sendername");
    const buyernames=document.getElementById("r_name");
    const  username=document.getElementById("UserName");
    const  balanceval=document.getElementById("Userbalance");
    const amountval=document.getElementById("money");
    

    const state = {
        userList: [],
        history:[],
      };
   
   /*function deleteUser(id){

      const userid=state.userList.findIndex((item)=>item.id=id)
      const deluser = state.userList.splice(userid,1)
  
	     setState('history', [
	    	{
		   	username: deluser.name,
		   	id: Math.floor(Math.random() * 100),
		  	text: 'delete',
		},
		...state.history,
	]);
  renderuserlist();
  renderhistorylist();
  option();}*/
  

    function renderuserlist(){
      const list_ul=[document.getElementById("users")]
         list_ul.forEach(function(useradd){
            useradd.innerHTML=" ";
               state.userList.forEach(function(item){
                  const newli=document.createElement("li");
                  const delbtn=document.createElement("button");
                  delbtn.textContent="Del";
                  newli.innerHTML=`<div class="row"><div class="col-6">${item.name}</div><div class="col-4">${item.balance}</div>
                  <button class="btn btn-danger btn-sm col-2" onclick="deleteUser(${item.id})"}>Del</button></div>`
                   newli.setAttribute("data-id",item.id)
                   newli.setAttribute("class","list-group-item")
                  useradd.appendChild(newli) 
    });
  });
    }
    
    function renderhistorylist(){
      const  his_ul=document.getElementById("info")
         his_ul.innerHTML=" ";
         state.history.forEach(function(data){
            const {senderuser,r_user,amount,date,id}=data
           const newli=document.createElement("li");
           newli.innerText=`${senderuser.name} kişisinden ${r_user.name} kişisine ${date} tarihinde ${amount} tl gönderildi`
           newli.setAttribute("data-id",data.id)
           his_ul.appendChild(newli)
          });

    }
    
    function option(){
     const selectop=[sendernames,buyernames]
      selectop.forEach(function(selectval){
       selectval.innerHTML=" "
        state.userList.forEach(function(f){
          const optionvalue=document.createElement("option")
          optionvalue.innerText=f.name;
          optionvalue.setAttribute('data-id',f.id);
          if (selectval.getAttribute("id") === "sendername") {
          selectval.options.add(optionvalue,1);
          }else
          {
            selectval.options.add(optionvalue,1);

        }
        
    })
      })}

    
    
    function setState(stateName, newValue) {
        state[stateName] = newValue;
        renderuserlist();
        
        }
      
    
    function NewUserAdd(){;
      setState("userList", [
          ...state.userList,
          {
        id:Math.floor(Math.random()*100),
        name:username.value,
        balance:balanceval.value,

      },

    ]);
    option();
    username.value="";
    balanceval.value="";
    username.focus();

  }
  
  
  function submit(){
    const  datas=[...state.userList]
    const date=new Date().toLocaleString();
    const amount=amountval.value;
    const senderid = Number(sendernames.selectedOptions[0].getAttribute("data-id"));
    const r_id = Number(buyernames.selectedOptions[0].getAttribute("data-id"));
    const senderuser = datas.find(item=>item.id===senderid)
    const r_user= datas.find(item=>item.id===r_id)

      if(senderuser===r_user){
        alert("Gönderici Ve Alıcı Aynı Kişi Olamaz");
      }
      else if(amount<=0){
        alert("Lütfen Geçerli Bir Tutar Miktarı  Giriniz")

      }
      else if( senderuser.balance-amount>=0){
        senderuser.balance =senderuser.balance- amount
        r_user.balance =Number(r_user.balance)+ Number(amount)
        console.log("Para Transferi Başarılı");
        addhistory(senderuser,r_user,amount,date) 
      
      }else
      {
        alert(" Bakiyeniz yetersiz İşlem gerçekleştirilemedi")

      
  }
  sendernames.value="";
  buyernames.value="";
  amountval.value="";

}

    function addhistory(senderuser,r_user,amount,date) {
      setState("history", [
          ...state.history,
          { 
            id: Math.floor(Math.random() * 100),
            senderuser,r_user,amount,date}
        ]);
       
        renderhistorylist();
        
    }
  

  
      
  
