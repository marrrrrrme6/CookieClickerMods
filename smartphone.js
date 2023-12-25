javascript:(()=>{
    (function() {
        AddEvent(document,'touchstart',e=>{
            Game.mouseX=(e.touches[0].pageX)/Game.scale;
            Game.mouseY=(e.touches[0].pageY-TopBarOffset)/Game.scale;
            Game.lastActivity=Game.time;
            Game.mouseDown=1;
            Game.clickFrom=event.target;
        });
        AddEvent(document,'touchmove',e=>{
            Game.mouseX=(e.changedTouches[0].pageX)/Game.scale;
            Game.mouseY=(e.changedTouches[0].pageY-TopBarOffset)/Game.scale;
            Game.mouseMoved=1;
            Game.lastActivity=Game.time;
        });
        AddEvent(document,'touchend',()=>{
            Game.lastActivity=Game.time;
            Game.mouseDown=0;
            Game.clickFrom=0;
        });
    })();
    
    (function() {
        const s=(id,prop,val)=>{l(id).style[prop]=val;};
        for(let i of ['toggleUpgrades','upgrades','vaultUpgrades'])s(i,'height','auto');
    })();
    (function() {
        const M=Game.Objects['Temple'].minigame;
        M.godSelected=-1,M.slotSelected=-1;
        const id=()=>M.gods[M.godSelected].id;
        const name=n=>{
            for(let i in M.gods)if(M.gods[i].id===n)return i;
            return -1;
        };
        const on=(g,s=-1)=>{
            M.godSelected=g,M.slotSelected=s;
            if(s===-1)l('templeGod'+id()).classList.add('godSelected');
            else l('templeSlot'+s).classList.add('godSelected');
            PlaySound('snd/toneTick.mp3');
        };
        const off=()=>{
            const s=M.slotSelected;
            if(s===-1)l('templeGod'+id()).classList.remove('godSelected');
            else l('templeSlot'+s).classList.remove('godSelected');
            M.godSelected=-1,M.slotSelected=-1;
        };
        const set=n=>{
            M.dragGod({'id':id()});
            M.dragging=M.gods[M.godSelected];
            M.slotHovered=n;
            M.dropGod();
            if(id()!==-1)l('templeGodPlaceholder'+id()).style.display='none';
            off();
        };
        let el=document.createElement('style');
        el.innerHTML=`
            .templeGod:hover,.temple:active{
                box-shadow:4px 4px 4px #000;
                background-position:0 0;
                z-index:auto;
            }
            .templeGod.ready:hover .templeIcon{
                animation-name:none;
                animation-iteration-count:0;
                animation-duration:0s;
            }
            .templeGod.godSelected{
                box-shadow:6px 6px 6px 2px #000;
                background-position:0px 74px;
                z-index:1000000001;
                transform:scale(1.2)!important;
            }
            .templeGod.ready.godSelected .templeIcon{
                animation-name:bounce;
                animation-iteration-count:infinite;
                animation-duration:0.8s;
            }
        `;
        l('templeContent').appendChild(el);
        for(let i in M.gods){
            const me=M.gods[i];
            l('templeGod'+me.id).addEventListener('click',(g=>()=>{
                if(M.gods[g].slot!==-1||M.slotSelected!==-1)return;
                if(M.godSelected===g)off();
                else{if(M.godSelected!=-1)off();on(g);}
            })(i));
            for(let j of ['mousedown','mouseup']){
                 l('templeGod'+me.id).addEventListener(j,e=>{e.stopPropagation()},true);
            }
        }
        for(let i in M.slot){
            l('templeSlot'+i).addEventListener('click',(i=>()=>{
                if(M.godSelected===-1){
                    const n=M.slot[i];
                    if(n===-1)return;
                    on(name(n),i);
                }else{
                    if(M.slot[i]===id()){off();return;}
                    set(i);
                }
            })(i));
        }
        l('templeGods').addEventListener('click',()=>{
            if(M.godSelected===-1||M.slotSelected===-1)return;
            set(-1);
        });
    })();
    alert('完了');
})();
