(() => {
  'use strict';
  const helpUrls = {
    android:'https://support.google.com/files/answer/9048509?hl=pt-BR',
    iphone:'https://support.apple.com/pt-br/102532',
    windows:'https://support.microsoft.com/pt-br/windows/experience/storage-filemanagement/zip-and-unzip-files',
    mac:'https://support.apple.com/pt-br/guide/mac-help/mchlp2528/mac'
  };
  const commonDownload='Abra seu link de acesso, escolha o arquivo e selecione <strong>Baixar</strong>. Espere o download terminar antes de continuar.';
  const mobileOpen='Encontre os arquivos extraídos na mesma pasta do ZIP. Escolha um <strong>PDF</strong> para visualizar e imprimir ou um <strong>PNG</strong> para abrir como imagem.';
  const computerOpen='Abra a pasta extraída. Dê dois cliques no <strong>PDF</strong> ou no <strong>PNG</strong>. Para <strong>STUDIO</strong> ou <strong>STUDIO3</strong>, use o Silhouette Studio.';
  const guides={
    android:{name:'No celular Android',app:'Você vai usar o Files do Google.',label:'Android',steps:[
      ['Baixe o arquivo',commonDownload,'Procure o arquivo na pasta Downloads.','download'],
      ['Extraia o ZIP','Abra o <strong>Files do Google</strong>, encontre o ZIP em Downloads e toque nele. Selecione <strong>Extrair</strong> e depois <strong>Concluído</strong>.','Extrair é retirar os moldes de dentro do ZIP.','extract'],
      ['Abra seus moldes',mobileOpen,'Arquivos STUDIO precisam de computador.','files']]},
    iphone:{name:'No iPhone ou iPad',app:'Você vai usar o app Arquivos.',label:'iPhone e iPad',steps:[
      ['Baixe o arquivo',commonDownload+' Se o navegador oferecer essa opção, salve no app <strong>Arquivos</strong>.','Procure em Downloads, no iCloud Drive ou em No Meu iPhone.','download'],
      ['Toque no ZIP','Abra o app <strong>Arquivos</strong> e encontre o ZIP baixado. <strong>Toque uma vez no arquivo</strong>: uma pasta com o conteúdo será criada no mesmo local.','Não precisa instalar um extrator para abrir um ZIP comum.','iphone-extract'],
      ['Abra seus moldes','Toque na pasta que acabou de aparecer. Depois, toque no <strong>PDF</strong> para visualizar ou no <strong>PNG</strong> para abrir a imagem.','Arquivos STUDIO precisam de computador.','files']]},
    windows:{name:'No computador Windows',app:'Você vai usar o Explorador de Arquivos.',label:'Windows',steps:[
      ['Baixe o arquivo',commonDownload+' Abra o <strong>Explorador de Arquivos</strong> e entre em <strong>Downloads</strong>.','O arquivo baixado pode terminar em .zip.','download'],
      ['Extraia todos os arquivos','Clique com o <strong>botão direito</strong> no ZIP e escolha <strong>Extrair Tudo…</strong>. Selecione a pasta de destino e confirme em <strong>Extrair</strong>.','Abra a pasta extraída, e não apenas o ZIP.','windows-extract'],
      ['Abra seus moldes',computerOpen,'No Silhouette Studio, escolha Arquivo > Abrir.','files']]},
    mac:{name:'No computador Mac',app:'Você vai usar o Finder.',label:'Mac',steps:[
      ['Baixe o arquivo',commonDownload+' Abra o <strong>Finder</strong> e localize o arquivo em <strong>Downloads</strong>.','Se o navegador já extraiu o ZIP, vá direto à pasta criada.','download'],
      ['Abra o ZIP','Dê <strong>dois cliques no arquivo ZIP</strong>. O Mac extrai o conteúdo e cria uma pasta no mesmo local. Aguarde a extração terminar.','A pasta extraída fica ao lado do arquivo ZIP.','mac-extract'],
      ['Abra seus moldes',computerOpen,'PDF costuma abrir no app Pré-Visualização.','files']]}
  };
  function screen(kind){
    const images={
      download:['01-baixe-o-arquivo.png','Passo 1: toque em Baixar e aguarde o arquivo ZIP terminar de baixar.'],
      extract:['02-extraia-o-zip.png','Passo 2: extraia o ZIP para acessar os arquivos na pasta.'],
      files:['03-abra-seus-moldes.png','Passo 3: abra PDF e PNG no aparelho; STUDIO precisa do Silhouette Studio no computador.']
    };
    const [file,alt]=images[kind]??images.extract;
    return `<a class="step-image-link" href="assets/${file}" target="_blank" rel="noopener noreferrer" aria-label="Ampliar imagem: ${alt}"><img src="assets/${file}" alt="${alt}" width="1254" height="1254" loading="lazy" decoding="async"></a>`;
  }
  const tabs=[...document.querySelectorAll('[data-device]')];
  const panel=document.getElementById('device-guide');
  function select(device){
    const guide=guides[device]; if(!guide)return;
    tabs.forEach(t=>{const active=t.dataset.device===device;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
    panel.setAttribute('aria-labelledby','tab-'+device);
    document.getElementById('device-name').textContent=guide.name;
    document.getElementById('device-app').textContent=guide.app;
    document.getElementById('steps').innerHTML=guide.steps.map(([title,body,tip,kind],i)=>`<li class="step"><span class="step-number">${i+1}</span><h3>${title}</h3><p>${body}</p><div class="screen" aria-label="Exemplo ilustrativo do passo ${i+1}">${screen(kind)}</div><p class="step-tip">${tip}</p></li>`).join('');
    const help=document.getElementById('official-help');help.href=helpUrls[device];help.textContent='Ver ajuda oficial para '+guide.label;
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(tab.dataset.device));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();select(tabs[next].dataset.device);tabs[next].focus();}
    });
  });
  const url=window.LINA_CONFIG?.downloadUrl;
  if(url){
    try{
      const parsed=new URL(url);
      if(parsed.protocol==='https:'){
        const button=document.getElementById('access-button');button.href=parsed.href;button.target='_blank';button.rel='noopener noreferrer';button.textContent='Acessar meus arquivos';
        document.getElementById('access-note').textContent='Depois de acessar sua coleção, siga o guia abaixo para baixar e abrir os arquivos.';
      }
    }catch{ /* Um endereço inválido mantém a navegação ao guia. */ }
  }
})();
