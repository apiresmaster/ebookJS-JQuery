$(function() {
	var $lastClicked;

	/**
	***Evento que exclui uma tarefa
	**/
	function onTarefaDeleteClick() {
		$(this).parent('.tarefa-item')
			.off('click')
		  	.hide('slow', function() {
		    	$(this).remove();
		});
	}

	/**
	***Evento que edita uma tarefa
	**/
	function onTarefaItemClick() {
		if(!$(this).is($lastClicked)) {
			if($lastClicked !== undefined) {
				savePendingEdition($lastClicked);
			}

			$lastClicked = $(this);
			var text = $lastClicked.children(".tarefa-texto").text();
			var content = "<input type='text' class='tarefa-edit' value='"+ text +"'> "+
						"<button type='button' id='adicionar'>Adicionar</button>";
			$lastClicked.html(content);

			$("#btSalvar").click(savePendingEdition);
			$(".tarefa-edit").keydown(onTarefaEditKeydown);
		}
	}


	function onTarefaKeydown(event) {		
		if(event.which === 13) {
			addTarefa($("#tarefa").val());
			$("#tarefa").val("");
			console.log("------");
		}
	}

	/**
	***Dispara evento ao pressionar botão Enter
	**/
	function onTarefaEditKeydown(event) {
		if(event.which === 13) {
			savePendingEdition($lastClicked);
			$lastClicked = undefined;
		}
	}

	/**
	***Salva uma tarefa
	**/
	function savePendingEdition($tarefa) {		
		var text = $tarefa.children(".tarefa-edit").val();
		$tarefa.empty();

		$tarefa.append($("<div />").addClass("tarefa-texto").text(text)).
				append($("<div />").addClass("tarefa-delete")).
				append($("<div />").addClass("clear"));

		$(".tarefa-delete").click(onTarefaDeleteClick);
		$tarefa.click(onTarefaItemClick);
	}

	function addTarefa(text) {
		var $tarefa = $("<div />").addClass("tarefa-item").
						append($("<div />").addClass("tarefa-texto").text(text)).
						append($("<div />").addClass("tarefa-delete")).
						append($("<div />").addClass("clear"));

		$("#tarefa-list").append($tarefa);
		$(".tarefa-delete").click(onTarefaDeleteClick);
		$(".tarefa-item").click(onTarefaItemClick);
	}

	//Registra eventos
  	$(".tarefa-delete").click(onTarefaDeleteClick);
  	$(".tarefa-item").click(onTarefaItemClick);
  	//evento Keydown pois pega o item específico por id
  	$("#tarefa").keydown(onTarefaKeydown);
});