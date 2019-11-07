"USE STRICT";
app.controller("pessoaController", function($scope, $location, dbService){
	
	$scope.createTable = function(){
		dbService.run("CREATE TABLE IF NOT EXISTS pessoas (id         INTEGER    PRIMARY KEY AUTOINCREMENT, nome       CHAR (100), email      CHAR (100), nascimento DATE, endereco   CHAR (200), ativo      INT        DEFAULT (1) );",function(res){
			if(res.error)
				throw res.error;
			console.log(res);
		});
	}
	
	//Listando
	$scope.listaPessoas = function(){
		dbService.runAsync("SELECT * FROM pessoas WHERE ativo = 1", function(data){
			$scope.pessoas = data;
		});
	}

	//Salvando
	$scope.salvar = function(){
		if($scope.pessoa.id){
			//Editar
			var id = $scope.pessoa.id;
			delete $scope.pessoa.id;
			delete $scope.pessoa.$$hashKey; //Apaga elemento $$hashKey do objeto
			dbService.update('pessoas', $scope.pessoa, {id: id}); //entidade, dados, where
		}else{
			//nova
			dbService.insert('pessoas', $scope.pessoa); // entidade, dados
		}
		$scope.pessoa = {};
		$scope.listaPessoas();
		$('#modalPessoa').modal('hide');
	}

	//Abrindo para editar
	$scope.editar = function(dados){
		$scope.pessoa = dados;
		$('#modalPessoa').modal('show');
	}

	//Excluindo
	$scope.excluir = function(dados){
		if(confirm("Deseja realmente apagar o cadastro de "+dados.nome+"?")){
			dbService.update('pessoas', {ativo:0}, {id: dados.id});
			$scope.listaPessoas();
		}
	}
});