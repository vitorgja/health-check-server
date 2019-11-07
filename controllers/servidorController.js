"USE STRICT";
app.controller("servidorController", function($scope, $location, dbService){
	
	$scope.createTable = function(){
		dbService.run("CREATE TABLE IF NOT EXISTS servidores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome CHAR (100), protocolo CHAR(8) DEFAULT ('https://'), host VARCHAR (100), port VARCHAR, path VARCHAR (200), ativo      INT        DEFAULT (1) );",function(res){
			if(res.error)
				throw res.error;


			var wildfly   = { id: 0, nome: "Wildfly",   protocolo: "http://", host: "localhost", port: 8585, path: "/wsselfbooking" }
			var tomcat    = { id: 1, nome: "Tomcat",    protocolo: "http://", host: "localhost", port: 8080, path: "/" }
			var aplicacao = { id: 2, nome: "Aplicacao", host: "local.lemontech.com.br", path: "/" }
			dbService.insert('servidores', wildfly);
			dbService.insert('servidores', tomcat);
			dbService.insert('servidores', aplicacao);
			console.log(res);
		});
		
		
	}

	$scope.createTable()
	
	//Listando
	$scope.listaServidores = function(){
		dbService.runAsync("SELECT * FROM servidores WHERE ativo = 1", function(data){
			$scope.servidores = data;
		});
	}

	//Salvando
	$scope.salvar = function(){
		if($scope.servidor.id){
			//Editar
			var id = $scope.servidor.id;
			delete $scope.servidor.id;
			delete $scope.servidor.$$hashKey; //Apaga elemento $$hashKey do objeto
			dbService.update('servidores', $scope.servidor, {id: id}); //entidade, dados, where
		}else{
			//nova
			dbService.insert('servidores', $scope.servidor); // entidade, dados
		}
		$scope.servidor = {};
		$scope.listaServidores();
		$('#modalPessoa').modal('hide');
	}

	//Abrindo para editar
	$scope.editar = function(dados){
		$scope.servidor = dados;
		$('#modalPessoa').modal('show');
	}

	//Excluindo
	$scope.excluir = function(dados){
		if(confirm("Deseja realmente apagar o cadastro de "+dados.nome+"?")){
			dbService.update('servidores', {ativo:0}, {id: dados.id});
			$scope.listaServidores();
		}
	}
});