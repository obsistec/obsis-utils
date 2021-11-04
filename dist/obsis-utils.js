"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var vue=require("vue"),vueRouter=require("vue-router"),vuex=require("vuex");const genderOptions=[{label:"Masculino",value:"M"},{label:"Feminino",value:"F"},{label:"N\xE3o aplic\xE1vel",value:"N"}],sexOptions=[{label:"Masculino",value:"M"},{label:"Feminino",value:"F"}],agendaTypeOptions=[{label:"Consulta",value:"C"},{label:"Exame",value:"E"},{label:"Laborat\xF3rio",value:"L"},{label:"Procedimento",value:"P"}];function getAgendaTypeOptions(e){return agendaTypeOptions.find(r=>r.value===e)||{}}const dayOfWeek=[{value:"DOMINGO",label:"Domingo"},{value:"SEGUNDA",label:"Segunda"},{value:"TERCA",label:"Ter\xE7a"},{value:"QUARTA",label:"Quarta"},{value:"QUINTA",label:"Quinta"},{value:"SEXTA",label:"Sexta"},{value:"SABADO",label:"S\xE1bado"}],conselhos=[{label:"CRAS",value:"CRAS"},{label:"COREN",value:"COREN"},{label:"CRF",value:"CRF"},{label:"CRFA",value:"CRFA"},{label:"CREFITO",value:"CREFITO"},{label:"CRM",value:"CRM"},{label:"CRN",value:"CRN"},{label:"CRO",value:"CRO"},{label:"CRP",value:"CRP"},{label:"CBO",value:"CBO"},{label:"Outros",value:"Outros"}],guideStatus=[{label:"Emitida",value:4},{label:"Executada",value:5},{label:"Cancelado",value:7}],agendaCalendarTypes=[{label:"Sem atendimento",value:"SA",color:"is-primary"},{label:"Todos livres",value:"TL",color:"is-success"},{label:"H\xE1 vagas",value:"HV",color:"is-info"},{label:"Todos ocupados",value:"TO",color:"is-warning"},{label:"Bloqueado",value:"B0",color:"is-danger"},{label:"Feriado",value:"F",color:"is-warning"}];function getAgendaCalendarTypes(e){return agendaCalendarTypes.find(r=>r.value===e)}const agendamentoStatus=[{value:"L",label:"Livre",color:"is-primary"},{value:"A",label:"Agendado",color:"is-success"},{value:"R",label:"Reservado",color:"is-warning"},{value:"CO",label:"Confirmado",color:"is-success"},{value:"CA",label:"Cancelado",color:"is-danger"},{value:"PC",label:"Paciente n\xE3o compareceu",color:"is-danger"},{value:"MF",label:"M\xE9dico faltou",color:"is-danger"},{value:"EX",label:"Executado",color:"is-secondary"},{value:"BO",label:"Bloqueado",color:"is-danger"}];function getAgendamentoStatus(e){return agendamentoStatus.find(r=>r.value===e)||agendamentoStatus[0]}function isCPF(e){try{return(e==null?void 0:e.toString().replace(/[^0-9]/g,"").length)===11}catch{return!1}}function isCNPJ(e){try{return(e==null?void 0:e.toString().replace(/[^0-9]/g,"").length)===14}catch{return!1}}function isEditFormByRouteName(e){try{return e==null?void 0:e.toString().includes("-edit")}catch{return!1}}function compareDates(e,r){r||(r=new Date().toISOString());const t=new Date(e.includes("T")?e:e.replaceAll("-","/")),n=new Date(r.includes("T")?r:r.replaceAll("-","/"));return t>=n}function addUTC(e){try{return e?typeof e!="string"||e.length>10?e:e.replaceAll("-","/"):""}catch(r){return""}}function formatDate(e){try{return e?Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(addUTC(e))):""}catch{return""}}function addDateMask(e){if(!e)return"";const r=e.replace(/\D/g,"");return(r==null?void 0:r.length)<3?r:(r==null?void 0:r.length)<5?`${r.slice(0,2)}/${r.slice(2,4)}`:`${r.slice(0,2)}/${r.slice(2,4)}/${r.slice(4)}`}function removeHoursOfDate(e){try{return e?(typeof e=="object"&&(e=e.toISOString()),e.split("T")[0]||""):""}catch(r){return""}}function removeDateMask(e){return e?(e=e.replace(/\D/g,""),(e==null?void 0:e.length)===4?`${e.slice(0,4)}-`:(e==null?void 0:e.length)===6?`${e.slice(0,4)}-${e.slice(4,6)}-`:e):""}function addDateMMAAAAMask(e){if(!e)return"";const r=e.replace(/\D/g,"");return(r==null?void 0:r.length)<3?r:`${r.slice(0,2)}/${r.slice(2)}`}function removeDateMMAAAAMask(e){return e?(e=e.replace(/\D/g,""),(e==null?void 0:e.length)===4?`${e.slice(0,4)}-`:e):""}function formatDateMMAAAA(e){try{return e?(e.length==4&&(e=`20${e.slice(2)}-${e.slice(0,2)}`),Intl.DateTimeFormat("pt-BR",{month:"2-digit",year:"numeric"}).format(new Date(addUTC(e)))):""}catch{return""}}function addHoursMask(e){e=e.replaceAll(/\D/g,"");let r=e.slice(0,2),t=e.slice(2,4);return Number(r[0])>2&&(r=`2${r[1]||""}`),Number(r)>23&&(r="23"),Number(t[0])>5&&(t=`5${t[1]||""}`),Number(t)>59&&(t="59"),e.length>2?`${r}:${t}`:r}function formatHours(e){try{if(!e)return"";const r=Number(e.slice(0,2)),t=Number(e.slice(3,5));return Intl.DateTimeFormat("pt-BR",{hour:"numeric",minute:"numeric"}).format(new Date().setHours(r,t))}catch(r){return""}}function formatDateTime(e,r){try{if(e==null?void 0:e.includes("T"))try{const[t,n]=e.split("T");e=t,r=n.substring(0,5)}catch{r=""}return e?r?Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"numeric",minute:"numeric"}).format(new Date(`${addUTC(e)} ${r}`)):formatDate(e):""}catch(t){return""}}function formatDateEn(e){try{return typeof e.toString=="function"&&(e=e.toString()),(typeof e!="string"&&!e.includes("/")||String(e).length>14)&&(e=formatDate(e)),e.includes("/")?e.split("/").reverse().join("-"):`${e.slice(4,8)}-${e.slice(2,4)}-${e.slice(0,2)}`}catch(r){return""}}function formatDateTimeEn(e,r){try{return`${formatDateEn(e)} ${r}`}catch(t){return""}}function formatDateLong(e){try{return e?(e.includes("/")&&(e=formatDateEn(e)),Intl.DateTimeFormat("pt-BR",{day:"numeric",month:"short",year:"numeric"}).format(new Date(addUTC(e)))):""}catch(r){return""}}function formatFullDateLong(e){try{return e?(e.includes("/")&&(e=formatDateEn(e)),Intl.DateTimeFormat("pt-BR",{day:"numeric",month:"long",year:"numeric"}).format(new Date(addUTC(e)))):""}catch(r){return""}}function formatNumericDateLong(e){try{return e?Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"numeric",month:"numeric",year:"numeric"}).format(new Date(addUTC(e))):""}catch(r){return""}}function formatDateTimeLong(e,r){try{if(e==null?void 0:e.includes("T"))try{const[t,n]=e.split("T");e=t,r=n.substring(0,5)}catch{r=""}return e&&!r?formatDateLong(e):e?Intl.DateTimeFormat("pt-BR",{day:"numeric",month:"long",year:"numeric",hour:"numeric",minute:"numeric"}).format(new Date(`${addUTC(e)} ${r}`)):""}catch(t){return""}}function getHourInDate(e){try{let r="";return r=(e==null?void 0:e.split("T")[1].substring(0,5))||"",r}catch{return""}}function formatMoneyNumberToString(e){try{if(e===void 0)return"";const r=e.toString();return r.includes(".")?r:`${r}.00`}catch(r){return""}}function formatPhone(e){try{return e?(e=removePhoneMask(e),e.length===13?`+${e.slice(0,2)} (${e.slice(2,4)}) ${e.slice(4,9)}-${e.slice(9)}`:e.length===12?`+${e.slice(0,2)} (${e.slice(2,4)}) ${e.slice(4,8)}-${e.slice(8)}`:e.length===11?`(${e.slice(0,2)}) ${e.slice(2,7)}-${e.slice(7)}`:e.length===10?`(${e.slice(0,2)}) ${e.slice(2,6)}-${e.slice(6)}`:e):""}catch{return e||""}}function removePhoneMask(e){try{return e?e.replace(/\D/g,""):""}catch{return e||""}}function formatFileName(e=""){try{return e.split("arquivo/")[1].split("?X-Amz")[0]}catch{return e}}function addMoneyMask(e){return e===void 0&&(e=0),Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e)}function removeMoneyMask(e){return e===void 0?"00.00":e.replace(/\./g,"").replace(",",".").replace("R$ ","")}function removeMoneyMaskAndConvert(e){return parseFloat(removeMoneyMask(e))}function formatCPF(e){return e?e.replace(/\D/g,"").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2"):""}function removeCPFMask(e){return e.replace(/\./g,"").replace(/-/g,"")}function formatCPFToLGPD(e){try{return e?`***.${formatCPF(e).slice(4,11)}-**`:""}catch{return e}}function formatCNPJ(e){return e?e.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3").replace(/\.(\d{3})(\d)/,".$1/$2").replace(/(\d{4})(\d)/,"$1-$2"):""}function removeCNPJMask(e){return e.replace(/\./g,"").replace(/-/g,"").replace(/\//g,"")}function formatLocality(e){return!(e==null?void 0:e.nm_cidade)||!e.ds_uf?"":`${e.nm_cidade} / ${e.ds_uf}`}function formatLocalityLong(e){var r,t;return!(e==null?void 0:e.nm_cidade)||!((r=e.cd_estado)==null?void 0:r.nm_estado)?"":`${e.nm_cidade} / ${(t=e.cd_estado)==null?void 0:t.nm_estado}`}function formatZipCode(e){return e.replace(/\D/g,"").replace(/^(\d{2})(\d)/,"$1.$2").replace(/\.(\d{3})(\d)/,".$1-$2")}function removeFormatZipCode(e){return e.replaceAll(".","").replaceAll("-","")}function formatGender(e){return e?e.toLowerCase()==="m"?"Masculino":"Feminino":"Outro"}function formatCreditCard(e){return(e==null?void 0:e.replace(/[^0-9]/,""))||""}function detectCardType(e){const r={electron:/^(4026|417500|4405|4508|4844|4913|4917)\d+$/,maestro:/^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,dankort:/^(5019)\d+$/,interpayment:/^(636)\d+$/,unionpay:/^(62|88)\d+$/,visa:/^4[0-9]{12}(?:[0-9]{3})?$/,mastercard:/^5[1-5][0-9]{14}$/,amex:/^3[47][0-9]{13}$/,diners:/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,discover:/^6(?:011|5[0-9]{2})[0-9]{12}$/,jcb:/^(?:2131|1800|35\d{3})\d{11}$/};for(const t in r)if(r[t].test(e))return t}function getUserName(e,r,t=!0){const n=String(`${e} ${r}`.trim());return n==="undefined"?"":!t&&(n==null?void 0:n.length)>16?n.split(" ")[0]:n}function splitUserName(e){const r=e.split(" "),t=r.slice(0,r.length>2?2:1).join(" "),n=r.slice(r.length>2?2:1).join(" ");return[t||"",n||""]}const localeConfig={firstDayOfWeek:0,dayNames:["Domingo","Segunda","Ter\xE7a","Quarta","Quinta","Sexta","S\xE1bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S\xE1b"],dayNamesMin:["Dom","Seg","Ter","Qua","Qui","Sex","S\xE1b"],monthNames:["Janeiro","Fevereiro","Mar\xE7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],today:"Hoje",clear:"Limpar",dateFormat:"dd/mm/yy",weekHeader:"Sem",startsWith:"Come\xE7a com",contains:"Cont\xE9m",notContains:"N\xE3o cont\xE9m",endsWith:"Termina com",equals:"\xC9 igual",notEquals:"N\xE3o \xE9 igual",noFilter:"Sem filtro",lt:"Menor que",lte:"Menos que ou igual a",gt:"Maior que",gte:"Melhor que ou igual a",dateIs:"Data \xE9",dateIsNot:"Data n\xE3o \xE9",dateBefore:"A data \xE9 antes",dateAfter:"A data \xE9 depois",apply:"Aplicar",matchAll:"Combinar tudo",matchAny:"Corresponder a qualquer",addRule:"Adicionar regra",removeRule:"Remover regra",accept:"Sim",reject:"N\xE3o",choose:"Escolher",upload:"Enviar",cancel:"Cancelar",weak:"Fraco",medium:"M\xE9dio",strong:"Forte",passwordPrompt:"Entre com uma senha",emptyFilterMessage:"Nenhum resultado encontrado",emptyMessage:"Sem op\xE7\xF5es dispon\xEDveis"};function useDownloadFile(){function e({content:t}){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([t],{type:"application/pdf"})),n.setAttribute("download",`report_${formatDateTimeEn(new Date,"current").replace(" ","_")}.pdf`),n.click()}function r({content:t}){const n=document.createElement("a");n.href=URL.createObjectURL(new Blob([t],{type:"application/csv"})),n.setAttribute("download",`report_${formatDateTimeEn(new Date,"current").replace(" ","_")}.csv`),n.click()}return{downloadPDF:e,downloadCSV:r}}function useFilter({ignore:e}={ignore:[]}){const r=vueRouter.useRoute();e==null||e.push("pg");const t=vue.computed(()=>Object.keys(r.query).filter(o=>!e.includes(o)).length),n=vue.computed(()=>Object.keys(r.query).filter(o=>!["pg"].includes(o)).length);return{hasFilters:t,hasAnyFilters:n,hasSpecificFilter:o=>Boolean(Object.keys(r.query).find(l=>o.includes(l)))}}const sexFilterOptions=[{label:"Todos",value:null},{label:"Masculino",value:"M"},{label:"Feminino",value:"F"}];function usePagination(e){const r=vuex.useStore(),t=vueRouter.useRoute(),n=vueRouter.useRouter(),[a,o]=e.module.split("."),l=vue.computed(()=>(o?r.state[a][o]:r.state[a])[e.field||"pagination"]);function u(c){const i=c.page+1;n.replace({query:{...t.query,pg:i}}),r.commit(e.setPage,{page:i}),e.updateList()}return r.commit(e.setPage,{page:1}),n.replace({query:{...t.query,pg:1}}),{pagination:l,handleUpdateCurrentPage:u}}function useRouterUtils(){function e(n){try{return String(n).split(",")}catch{return[]}}function r(n){try{return e(n).map(a=>Number(a))}catch{return[]}}function t(n){try{return(n==null?void 0:n.replaceAll(" ","_").toLocaleLowerCase())||""}catch{return""}}return{convertQueryToArray:e,convertQueryToNumberArray:r,normalizeRouteParam:t}}exports.addDateMMAAAAMask=addDateMMAAAAMask,exports.addDateMask=addDateMask,exports.addHoursMask=addHoursMask,exports.addMoneyMask=addMoneyMask,exports.addUTC=addUTC,exports.agendaCalendarTypes=agendaCalendarTypes,exports.agendaTypeOptions=agendaTypeOptions,exports.agendamentoStatus=agendamentoStatus,exports.compareDates=compareDates,exports.conselhos=conselhos,exports.dayOfWeek=dayOfWeek,exports.detectCardType=detectCardType,exports.formatCNPJ=formatCNPJ,exports.formatCPF=formatCPF,exports.formatCPFToLGPD=formatCPFToLGPD,exports.formatCreditCard=formatCreditCard,exports.formatDate=formatDate,exports.formatDateEn=formatDateEn,exports.formatDateLong=formatDateLong,exports.formatDateMMAAAA=formatDateMMAAAA,exports.formatDateTime=formatDateTime,exports.formatDateTimeEn=formatDateTimeEn,exports.formatDateTimeLong=formatDateTimeLong,exports.formatFileName=formatFileName,exports.formatFullDateLong=formatFullDateLong,exports.formatGender=formatGender,exports.formatHours=formatHours,exports.formatLocality=formatLocality,exports.formatLocalityLong=formatLocalityLong,exports.formatMoneyNumberToString=formatMoneyNumberToString,exports.formatNumericDateLong=formatNumericDateLong,exports.formatPhone=formatPhone,exports.formatZipCode=formatZipCode,exports.genderOptions=genderOptions,exports.getAgendaCalendarTypes=getAgendaCalendarTypes,exports.getAgendaTypeOptions=getAgendaTypeOptions,exports.getAgendamentoStatus=getAgendamentoStatus,exports.getHourInDate=getHourInDate,exports.getUserName=getUserName,exports.guideStatus=guideStatus,exports.isCNPJ=isCNPJ,exports.isCPF=isCPF,exports.isEditFormByRouteName=isEditFormByRouteName,exports.localeConfig=localeConfig,exports.removeCNPJMask=removeCNPJMask,exports.removeCPFMask=removeCPFMask,exports.removeDateMMAAAAMask=removeDateMMAAAAMask,exports.removeDateMask=removeDateMask,exports.removeFormatZipCode=removeFormatZipCode,exports.removeHoursOfDate=removeHoursOfDate,exports.removeMoneyMask=removeMoneyMask,exports.removeMoneyMaskAndConvert=removeMoneyMaskAndConvert,exports.removePhoneMask=removePhoneMask,exports.sexFilterOptions=sexFilterOptions,exports.sexOptions=sexOptions,exports.splitUserName=splitUserName,exports.useDownloadFile=useDownloadFile,exports.useFilter=useFilter,exports.usePagination=usePagination,exports.useRouterUtils=useRouterUtils;
//# sourceMappingURL=obsis-utils.js.map
